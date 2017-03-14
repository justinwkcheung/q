class VotesController < ApplicationController

  def new
    @vote = Vote.new
  end

  def create

    @vote = Vote.new(user_id: session[:user_id], suggestedsong_id: params[:suggestedsong_id], status: params[:status])
    @vote2 = Vote.where(user_id: session[:user_id], suggestedsong_id: params[:suggestedsong_id])
    if @vote2 != []
      if @vote.user_id == @vote2[0].user_id && @vote.suggestedsong_id == @vote2[0].suggestedsong_id && @vote.status != @vote2[0].status
          @vote2[0].update_attributes(status: @vote.status), flash.now[:notice] = "Vote updated!"
      elsif @vote.user_id == @vote2[0].user_id && @vote.suggestedsong_id == @vote2[0].suggestedsong_id && @vote.status == @vote2[0].status
        @vote2.destroy(@vote2), flash.now[:notice] = "Vote removed!"
      end
    else
      @vote.save!, flash.now[:message] = "Vote added!"
    end
    net_vote(SuggestedSong.find(params[:suggestedsong_id]).playlist_id)

  new_playlist =  SuggestedSong.playlist_songs(SuggestedSong.find(params[:suggestedsong_id]).playlist_id)

  ActionCable.server.broadcast(:app, new_playlist)

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
  params.require(:vote).permit(:user_id, :suggestedsong_id, :status)
end

def net_vote(playlist_id)
  @suggestedsongs = SuggestedSong.where(playlist_id: playlist_id)
  @suggestedsongs.each do |song|
    net_vote = Vote.where(suggestedsong_id: song.id).where(status: 'up').count - Vote.where(suggestedsong_id: song.id).where(status: 'down').count
    song.update_attribute('net_vote', net_vote)
  end
end

end
