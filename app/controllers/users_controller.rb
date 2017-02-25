class UsersController < ApplicationController

  def spotify
     spotify_user = RSpotify::User.new(request.env['omniauth.auth'])
     @spotify_user = spotify_user

    # Access private data
    @country = spotify_user.country 
    @email = spotify_user.email

    # Create playlist in user's Spotify account
    playlist = spotify_user.create_playlist!('bitmaker-2')
    @playlist = playlist

    # Add tracks to a playlist in user's Spotify account
    tracks = RSpotify::Track.search('Know')
    playlist.add_tracks!(tracks)
    @tracks = playlist.tracks

  end

end
