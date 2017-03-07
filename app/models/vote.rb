class Vote < ApplicationRecord
  belongs_to :suggested_song, class_name: 'SuggestedSong', foreign_key: 'suggestedsong_id'
  belongs_to :user
end
