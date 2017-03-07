class RenameSuggestedSong < ActiveRecord::Migration[5.0]
  def change
    rename_column :votes, :suggested_song_id, :suggestedsong_id
  end
end
