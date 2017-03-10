class User < ApplicationRecord
  has_secure_password

  has_many :votes
  has_many :suggested_songs
  has_many :authorizations
  has_many :playlists, through: :authorizations

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, confirmation: true
end
