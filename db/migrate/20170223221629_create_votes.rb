class CreateVotes < ActiveRecord::Migration[5.0]
  def change
    create_table :votes do |t|
      t.integer :user_id
      t.integer :suggested_song_id
      t.string :status

      t.timestamps
    end
  end
end
