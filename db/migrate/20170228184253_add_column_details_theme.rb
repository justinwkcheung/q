class AddColumnDetailsTheme < ActiveRecord::Migration[5.0]
  def change
    add_column :playlists, :description, :string
    add_column :playlists, :theme, :string 
  end
end
