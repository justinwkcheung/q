class PlaylistsController < ApplicationController

  def index
    spotify_user = RSpotify::User.new(session[:user])
    @my_playlist = spotify_user.create_playlist!('my-playlist')

    if params[:search]
      @artists = RSpotify::Artist.search(params[:search])
      @albums = RSpotify::Album.search(params[:search])
      @tracks = RSpotify::Track.search(params[:search])
      @playlists = RSpotify::Playlist.search(params[:search])
    else
      @artists = []
      @albums = []
      @tracks = []
      @playlists= []
    end
  end

  def show
    @playlist_q = Playlist.find(params[:id])
    @playlist_q_songs = SuggestedSong.find_by(playlist_id: @playlist_q.id)
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

    # if @playlist_q = Playlist.create(
    #   name: playlist_params[:name],
    #   description: playlist_params[:description],
    #   theme: playlist_params[:theme],
    #   redirect_to playlist_path(@playlist_q)
    # end

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

end
