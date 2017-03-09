class PlaylistsController < ApplicationController

  def player
    render :player, layout: false
  end

  def index
  end

#Step 1. In the model, we need to loop through the songs and only find the next song to be played
#Step 2. In the Javascript, we need to call this controller function b4 or at the time of the song ending.
#Step 3. Send the song to the player



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
  end

  def update_song
    access = Authorization.find_by(playlist_id: params[:playlist_id], user_id: session[:user_id]).status
    if access == "Host"
      SuggestedSong.find(params[:song_id]).update_attribute(:played, true)
      @next_song_id = SuggestedSong.next_song_id(params[:id])
      @next_song_record = SuggestedSong.next_song_record(params[:id])
      render json: {song_id: @next_song_id, song_record: @next_song_record}
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
