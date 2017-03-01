class AddVotesToSuggestedSong < ActiveRecord::Migration[5.0]
  def change
    add_column :suggested_songs, :upvote, :integer
    add_column :suggested_songs, :downvote, :integer
  end
end
