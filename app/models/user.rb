class User < ApplicationRecord
  has_secure_password

  has_many :votes
  has_many :suggested_songs
  has_many :authorizations
  has_many :playlists, through: :authorizations
end
