class AddPlayStatusToSuggestedSong < ActiveRecord::Migration[5.0]
  def change
    add_column(:suggested_songs, :played, :boolean, default: false)
  end
end
