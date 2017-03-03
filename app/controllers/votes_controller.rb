class VotesController < ApplicationController

  def new
    @vote = Vote.new
  end

  def create
    @vote = Vote.new(vote_params)
    @vote.save
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

end
