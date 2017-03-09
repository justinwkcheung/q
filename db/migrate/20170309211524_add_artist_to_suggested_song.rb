class AddArtistToSuggestedSong < ActiveRecord::Migration[5.0]
  def change
    add_column :suggested_songs, :artist, :string
  end
end
