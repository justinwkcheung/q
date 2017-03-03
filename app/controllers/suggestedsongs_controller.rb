class SuggestedsongsController < ApplicationController
  def new
    @suggested_song = SuggestedSong.new
  end

 def create
    @suggested_song = SuggestedSong.new(song_id: params[:song_id], user_id: 1 , playlist_id: params[:playlist_id], name: params[:name])
    # @suggested_song.user_id = session[:user_id]
    @suggested_song.save
    # if request.xhr?
    #   respond_to do |format|
    #   format.json render json: @suggested_song
    #   end
    # end

 end

 def destroy
    @suggested_song = SuggestedSong.find(params[:id])
    @suggested_song.destroy
  end

end
