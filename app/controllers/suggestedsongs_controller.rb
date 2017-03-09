class SuggestedsongsController < ApplicationController
  def new
    @suggested_song = SuggestedSong.new

    respond_to do |format|
      format.json { render json: {"test": "test"} }
    end
  end

 def create
    @suggested_song = SuggestedSong.new(song_id: params[:song_id], user_id: session[:user_id] , playlist_id: params[:playlist_id], name: params[:name])
    @suggested_song.save

    @songs = SuggestedSong.playlist_songs(params[:playlist_id])
    ActionCable.server.broadcast(:app, @songs)
 end

  def index

    @playlist_q = Playlist.find(params[:playlist_id])

    response = HTTParty.get("https://connect.deezer.com/oauth/access_token.php?app_id=#{ENV["deezer_application_id"]}&secret=#{ENV["deezer_secret_key"]}&code=#{params[:code]}&output=json")
    access_token = response["access_token"]
    @albums = HTTParty.get("http://api.deezer.com/search/album?q=#{params[:search]}&#{access_token}")
    @tracks = HTTParty.get("http://api.deezer.com/search/track?q=#{params[:search]}&#{access_token}")
    @artists = HTTParty.get("http://api.deezer.com/search/artist?q=#{params[:search]}&#{access_token}")
  end

 def show
   @suggested_song = SuggestedSong.find(params[:id])
   if request.xhr?
     respond_to do |format|
       format.json { render json: @suggested_song }
     end
   end
 end

 def destroy
    @suggested_song = SuggestedSong.find(params[:id])
    @suggested_song.destroy
  end

end
