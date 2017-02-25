require 'rspotify/oauth'

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :spotify, "442452f96c8d4907a8f290c96c787354", "51f603cfe25f48c188fb675bf8ef2ea8", scope: 'user-read-private user-read-email playlist-modify-public playlist-modify-private user-library-read user-library-modify'
end
