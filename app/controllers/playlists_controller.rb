class PlaylistsController < ApplicationController

  def index
    # spotify_user = RSpotify::User.new(request.env['omniauth.auth'])
    # my_playlist = spotify_user.create_playlist!('my-playlist')
    @my_playlist = Playlist.first

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

end
