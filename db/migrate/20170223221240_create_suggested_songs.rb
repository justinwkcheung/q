class CreateSuggestedSongs < ActiveRecord::Migration[5.0]
  def change
    create_table :suggested_songs do |t|
      t.integer :song_id
      t.integer :playlist_id
      t.integer :user_id
      t.string :name

      t.timestamps
    end
  end
end
