class AddAccessCodeToPlaylist < ActiveRecord::Migration[5.0]
  def change
    add_column :playlists, :access_code, :integer
  end
end
