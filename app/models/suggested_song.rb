class SuggestedSong < ApplicationRecord
  belongs_to :playlist
  belongs_to :user
  has_many :votes
end
