class VotesController < ApplicationController

  def new
    @vote = Vote.new
  end

  def create
    @vote = Vote.new(user_id: params[:user_id], suggested_song_id: params[:suggested_song_id], status: params[:status])
    @vote2 = Vote.where(user_id: params[:user_id], suggested_song_id: params[:suggested_song_id])
    if @vote2 != []
      if
        @vote.user_id == @vote2[0].user_id && @vote.suggested_song_id == @vote2[0].suggested_song_id && @vote.status != @vote2[0].status
        @vote2[0].update_attributes(status: @vote.status)
      elsif @vote.user_id == @vote2[0].user_id && @vote.suggested_song_id == @vote2[0].suggested_song_id && @vote.status == @vote2[0].status
        @vote2.destroy(@vote2)
      end
    else
      @vote.save
    end
    net_vote(1)
  end

  def destroy
    @vote = Vote.find(params[:id])
    @vote.destroy
  end

  def update
    @vote = Vote.find(params[:id])
    @vote.udpate_attributes(vote_params)
  end

private

def vote_params
  params.require(:vote).permit(:user_id, :suggested_song_id, :status)
end

def net_vote(playlist_id)
  @suggested_songs = SuggestedSong.where(playlist_id: playlist_id)
  @suggested_songs.each do |song|
    net_vote = Vote.where(suggested_song_id: song.id).where(status: 'up').count - Vote.where(suggested_song_id: song.id).where(status: 'down').count
    song.update_attribute('net_vote', net_vote)
  end
end

end
