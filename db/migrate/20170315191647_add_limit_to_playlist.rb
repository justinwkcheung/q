class AddLimitToPlaylist < ActiveRecord::Migration[5.0]
  def change
    add_column :playlists, :song_limit, :integer
  end
end
