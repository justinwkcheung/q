class PlaylistsController < ApplicationController

  def player
    render :player, layout: false
  end

  def index
  end

  def show
    @access = Authorization.find_by(playlist_id: params[:id], user_id: session[:user_id])
    if @access
      @access = @access.status
    else
      @access = "Viewer"
    end

    @playlist_q = Playlist.find(params[:id])
    @playlist_q_songs = SuggestedSong.where(playlist_id: @playlist_q.id)
    @next_song_id = SuggestedSong.next_song_id(params[:id])
    @next_song_record = SuggestedSong.next_song_record(params[:id])
    @songs = SuggestedSong.playlist_songs(params[:id])


    # This is related to the search function we are show

    response = HTTParty.get("https://connect.deezer.com/oauth/access_token.php?app_id=#{ENV["deezer_application_id"]}&secret=#{ENV["deezer_secret_key"]}&code=#{params[:code]}&output=json")
    access_token = response["access_token"]
    @albums = HTTParty.get("http://api.deezer.com/search/album?q=#{params[:search]}&#{access_token}")
    @tracks = HTTParty.get("http://api.deezer.com/search/track?q=#{params[:search]}&#{access_token}")
    @artists = HTTParty.get("http://api.deezer.com/search/artist?q=#{params[:search]}&#{access_token}")

    @unplayedsongs = SuggestedSong.where(playlist_id: @playlist_q.id, played: false).order(played: :desc, net_vote: :desc)
    @playedsongs = SuggestedSong.where(playlist_id: @playlist_q.id, played: true)
  end

  def update_song
    access = Authorization.find_by(playlist_id: params[:id], user_id: session[:user_id]).status

    if access == "Host"
      SuggestedSong.find(params[:song_id]).update_attribute(:played, true)
      @next_song_id = SuggestedSong.next_song_id(params[:id])
      @next_song_record = SuggestedSong.next_song_record(params[:id])
      render json: {song_id: @next_song_id, song_record: @next_song_record}

      new_playlist =  SuggestedSong.playlist_songs(params[:id])
      ActionCable.server.broadcast(:app, new_playlist)
    end
  end

  def join
  end

  def add_guest
    @access_code = params["access_code"]
    @playlist = Playlist.find_by(access_code: @access_code)
    if @playlist
      @authorization = Authorization.find_by(playlist_id: @playlist.id, user_id: session[:user_id])
      if @authorization
        redirect_to playlist_path(@playlist)
      else
        Authorization.create(playlist_id: @playlist.id, user_id: session[:user_id], status: "Guest")
        redirect_to playlist_path(@playlist)
      end
    else
      render :join
    end
  end

  def new
    @playlist = Playlist.new
    @themes = ['Pop', 'Alternative', 'Dance', 'Folk', 'Instrumental', 'Chill', 'Party', 'Blues', 'House/EDM', 'Rock', 'Rap', 'Hip-Hop', 'R&B', 'Electronic', 'Indie', 'Jazz', 'Reggae', 'Country', 'Other'].sort

  end

  def destroy
    @playlist_q = Playlist.find(params[:id])
    if @playlist_q.destroy
      redirect_to user_path(session[:user_id])
    end
  end

  def create
    access_code = create_random
    playlist_q = create_playlist(access_code)
    authorization = create_authorization(playlist_q)
    if playlist_q && authorization
      redirect_to playlist_path(playlist_q)
    end
  end

  def edit
    @playlist_q = Playlist.find(params[:id])
    @themes = ['House/EDM', 'Rock', 'Pop', 'Rap', 'Hip-Hop', 'R&B', 'Country', 'Other']
  end

  def update
    @playlist_q = Playlist.find(params[:id])
      if @playlist_q.update_attributes(playlist_params)
        redirect_to user_path(session[:user_id])
      else
        render :edit
      end
  end

  def update_publicity
    @playlist = Playlist.find(params[:id])
    if @playlist.public == false
      @playlist.update_attribute('public', true)
    else
      @playlist.update_attribute('public', false)
    end
    ActionCable.server.broadcast(:app, [@playlist, @playlist.public])
  end

private

  def create_random
    access_code = rand(999999)
    while Playlist.where(access_code: access_code).count > 0
      access_code = rand(999999)
    end
    access_code
  end

  def create_playlist(access_code)
    Playlist.create(
      name: playlist_params[:name],
      description: playlist_params[:description],
      theme: playlist_params[:theme],
      access_code: access_code)
  end

  def create_authorization(playlist)
    Authorization.create(
      playlist_id: playlist.id,
      user_id: session[:user_id],
      status: "Host")
  end

  def playlist_params
      params.require(:playlist).permit(:name, :description, :theme)
  end
end
