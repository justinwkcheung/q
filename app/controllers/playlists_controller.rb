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

  def new
    @playlist = Playlist.new
  end

  def destroy
    @playlist_q = Playlist.find(params[:id])
    if @playlist_q.destroy
      redirect_to playlists_path
    end
  end

  def create
    @playlist_spotify = RSpotify::User.new(session[:user]).create_playlist!(playlist_params[:name])
    session[:uri] = @playlist_spotify.uri

    if @playlist_q = Playlist.create(name: playlist_params, uri: session[:uri])
      redirect_to playlist_path(@playlist_q)

    end
  end

private

  def playlist_params
      params.require(:playlist).permit(:name)
  end

end
