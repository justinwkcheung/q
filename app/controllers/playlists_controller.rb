class PlaylistsController < ApplicationController

  def player
    render :player, layout: false
  end

  def index

    response = HTTParty.get("https://connect.deezer.com/oauth/access_token.php?app_id=#{ENV["deezer_application_id"]}&secret=#{ENV["deezer_secret_key"]}&code=#{params[:code]}&output=json")

    access_token = response["access_token"]
    @albums = HTTParty.get("http://api.deezer.com/search/album?q=#{params[:search]}&#{access_token}")
    @tracks = HTTParty.get("http://api.deezer.com/search/track?q=#{params[:search]}&#{access_token}")
    @artists = HTTParty.get("http://api.deezer.com/search/artist?q=#{params[:search]}&#{access_token}")

  end

  def show
    @playlist_q = Playlist.find(params[:id])
    @playlist_q_songs = SuggestedSong.where(playlist_id: @playlist_q.id)
    if !@playlist_q_songs.empty?
      @first_song = @playlist_q_songs.first.song_id
      @second_song = @playlist_q_songs.second.song_id
    else
      @first_song = 0
      @second_song = 0
    end
  end

  def new
    @playlist = Playlist.new
    @themes = ['House/EDM', 'Rock', 'Pop', 'Rap', 'Hip-Hop', 'R&B', 'Country', 'Other']
  end

  def destroy
    @playlist_q = Playlist.find(params[:id])
    if @playlist_q.destroy
      redirect_to playlists_path
    end
  end

  def create
    if create_playlist
      redirect_to playlist_path(@playlist_q)
    end

  end

  def edit
    @playlist_q = Playlist.find(params[:id])
    @themes = ['House/EDM', 'Rock', 'Pop', 'Rap', 'Hip-Hop', 'R&B', 'Country', 'Other']
  end

  def update
    @playlist_q = Playlist.find(params[:id])
      if @playlist_q.update_attributes(playlist_params)
        redirect_to playlist_path(@playlist_q)
      else
        render :edit
      end
  end



private

  def playlist_params
      params.require(:playlist).permit(:name, :description, :theme)
  end


  def create_playlist
    @playlist_q = Playlist.create(
      name: playlist_params[:name],
      description: playlist_params[:description],
      theme: playlist_params[:theme])
    @authorization = Authorization.create(
      playlist_id: @playlist_q.id,
      user_id: session[:user_id],
      status: "Host")
  end

end
