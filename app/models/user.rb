class User < ApplicationRecord
  has_secure_password

  has_many :votes
  has_many :suggested_songs
  has_many :authorizations
  has_many :playlists, through: :authorizations

  validates :first_name, presence: true
  validates :last_name, presence: true
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true, format: {with: VALID_EMAIL_REGEX}, :uniqueness => {:case_sensitive => false}
  validates :password, length: {in: 6..20}, confirmation: true
end
