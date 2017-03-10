class Playlist < ApplicationRecord
  has_many :suggested_songs
  has_many :authorizations
  has_many :users, through: :authorizations

  validates :name, presence: true
  validates :theme, presence: true
end
