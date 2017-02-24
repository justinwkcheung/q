class Vote < ApplicationRecord
  belongs_to :suggested_song
  belongs_to :user
end
