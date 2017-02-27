class PlaylistsController < ApplicationController

  def show
  end

  def new
    @playlist = Playlist.new
  end

  def destroy
    @playlist_q = Playlist.find(params[:id])
    me = RSpotify::User.new(session[:user])
    byebug
    if @playlist_q.destroy
      
      byebug
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
