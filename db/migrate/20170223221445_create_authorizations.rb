class CreateAuthorizations < ActiveRecord::Migration[5.0]
  def change
    create_table :authorizations do |t|
      t.integer :playlist_id
      t.integer :user_id
      t.string :status

      t.timestamps
    end
  end
end
