class AddPlaylistUriToPlaylists < ActiveRecord::Migration[5.0]
  def change
    add_column :playlists, :uri, :string
  end
end
