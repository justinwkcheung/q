class AddUserNameToSuggestedSong < ActiveRecord::Migration[5.0]
  def change
    add_column :suggested_songs, :user_name, :string
  end
end
