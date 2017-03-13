class SuggestedsongsController < ApplicationController
  def new
    @suggested_song = SuggestedSong.new
  end

 def create
    @suggested_song = SuggestedSong.new(song_id: params[:song_id], user_id: session[:user_id], user_name: User.find(session[:user_id]).first_name, playlist_id: params[:playlist_id], name: params[:name], artist: params[:artist])
    @suggested_song.save

    @songs = SuggestedSong.playlist_songs(params[:playlist_id])
    @users = User.all
    ActionCable.server.broadcast(:app, @songs)
 end

  def index
    @playlist_q = Playlist.find(params[:playlist_id])

    response = HTTParty.get("https://connect.deezer.com/oauth/access_token.php?app_id=#{ENV["deezer_application_id"]}&secret=#{ENV["deezer_secret_key"]}&code=&output=json")
    access_token = response["access_token"]
    @albums = HTTParty.get("http://api.deezer.com/search/album?q=#{params[:q]}&#{access_token}")
    @tracks = HTTParty.get("http://api.deezer.com/search/track?q=#{params[:q]}&#{access_token}")
    @artists = HTTParty.get("http://api.deezer.com/search/artist?q=#{params[:q]}&#{access_token}")

    if request.xhr?
      respond_to do |format|
        format.json do render json: {artists:  @artists, albums: @albums, tracks: @tracks} end
      end
    end

  end

 def show
   @suggested_song = SuggestedSong.find(params[:id])
 end

 def destroy
    @suggested_song = SuggestedSong.find(params[:id])
    @suggested_song.destroy
  end

end
