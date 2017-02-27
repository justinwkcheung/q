require 'rspotify/oauth'

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :spotify, ENV["spotify_client_id"], ENV["spotify_secret"], scope: 'user-read-private user-read-email playlist-modify-public playlist-modify-private user-library-read user-library-modify'
end
