class RenameUpvoteToNetvote < ActiveRecord::Migration[5.0]
  def change
    rename_column :suggested_songs, :upvote, :net_vote
  end
end
