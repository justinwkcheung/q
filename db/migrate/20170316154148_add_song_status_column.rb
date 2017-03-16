class AddSongStatusColumn < ActiveRecord::Migration[5.0]
  def change
    remove_column :suggested_songs, :played, :boolean
    add_column :suggested_songs, :status, :string
  end
end
