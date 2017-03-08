class SuggestedSong < ApplicationRecord
  belongs_to :playlist
  belongs_to :user
  has_many :votes


  #Step 1. In the model, we need to loop through the songs and only find the next song to be played
  #Step 2. In the Javascript, we need to call this controller function b4 or at the time of the song ending.
  #Step 3. Send the song to the player



    def self.next_song_id(playlist_id)
      songs = SuggestedSong.where(playlist_id: playlist_id).order(net_vote: :desc)
      songs.each do |song|
        if song.played == false
          @next_song = song.song_id
          return @next_song
        end
      end
      return 0
    end

    def self.next_song_record(playlist_id)
      songs = SuggestedSong.where(playlist_id: playlist_id).order(net_vote: :desc)
      songs.each do |song|
        if song.played == false
          return song.id
        end
      end
    end

    def self.playlist_length(playlist_id)
      length = SuggestedSong.where(playlist_id: playlist_id).count
    end

    def self.playlist_songs(playlist_id)
      songs = SuggestedSong.where(playlist_id: playlist_id).order(net_vote: :desc)
    end
end


  # def net_vote(playlist_id)
  #   @suggested_songs = SuggestedSong.where(playlist_id: playlist_id)
  #   @suggested_songs.each do |song|
  #     s = SuggestedSong.find(playlist_id: playlist_id, id: song.id)
  #     net_vote = Vote.where(suggested_song_id: song.id).where(status: 'up').count - Vote.where(suggested_song_id: song.id).where(status: 'down').count
  #     s.update_attribute(net_vote: net_vote)
  #   end
  # end
