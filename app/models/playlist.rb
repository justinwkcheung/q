class Playlist < ApplicationRecord
  has_many :suggested_songs
  has_many :authorizations
  has_many :users, through: :authorizations
end
