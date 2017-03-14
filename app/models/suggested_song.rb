class SuggestedSong < ApplicationRecord
  belongs_to :playlist
  belongs_to :user
  has_many :votes
  # validate :no_duplicates

    def self.next_song_id(playlist_id)
      songs = SuggestedSong.where(playlist_id: playlist_id).order(played: :desc, net_vote: :desc)
      songs.each do |song|
        if song.played == false
          @next_song = song.song_id
          return @next_song
        end
      end
      return 0
    end

    def self.next_song_record(playlist_id)
      songs = SuggestedSong.where(playlist_id: playlist_id).order(played: :desc, net_vote: :desc)
      songs.each do |song|
        if song.played == false
          return song.id
        end
      end
      return 0
    end

    def self.playlist_length(playlist_id)
      length = SuggestedSong.where(playlist_id: playlist_id).count
    end

    def self.playlist_songs(playlist_id)
      songs = SuggestedSong.where(playlist_id: playlist_id).order(played: :desc, net_vote: :desc)
    end

    # private
    #
    # def no_duplicates
    #   if SuggestedSong.where(playlist_id: params[:playlist_id], song_id: params[:song_id]).count > 0 &&
    #     (SuggestedSong.find_by(playlist_id: params[:playlist_id], song_id: params[:song_id])).played == false
    #     errors.add(:track, 'has already been added!')
    #   end
    # end
end
