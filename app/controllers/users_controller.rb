class UsersController < ApplicationController

  def spotify
     spotify_user = RSpotify::User.new(request.env['omniauth.auth'])
     @spotify_user = spotify_user

    @playlist = @spotify_user.playlists.first
    @uri = @playlist.uri

  end

end
