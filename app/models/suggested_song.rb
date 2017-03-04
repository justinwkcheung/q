class SuggestedSong < ApplicationRecord
  belongs_to :playlist
  belongs_to :user
  has_many :votes

  # def net_vote(playlist_id)
  #   @suggested_songs = SuggestedSong.where(playlist_id: playlist_id)
  #   @suggested_songs.each do |song|
  #     s = SuggestedSong.find(playlist_id: playlist_id, id: song.id)
  #     net_vote = Vote.where(suggested_song_id: song.id).where(status: 'up').count - Vote.where(suggested_song_id: song.id).where(status: 'down').count
  #     s.update_attribute(net_vote: net_vote)
  #   end
  # end
end
