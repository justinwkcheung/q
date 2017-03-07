class AddNetVoteDefaultToSuggestedSong < ActiveRecord::Migration[5.0]
  def change
    remove_column(:suggested_songs, :net_vote)
    add_column(:suggested_songs, :net_vote, :integer, default: 0)
  end
end
