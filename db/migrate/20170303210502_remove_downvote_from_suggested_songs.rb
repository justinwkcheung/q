class RemoveDownvoteFromSuggestedSongs < ActiveRecord::Migration[5.0]
  def change
    remove_column :suggested_songs, :downvote, :interger
  end
end
