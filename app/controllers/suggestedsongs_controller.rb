class SuggestedsongsController < ApplicationController
  def new
    @suggested_song = SuggestedSong.new
  end

 def create
    @songs_before = SuggestedSong.playlist_songs(params[:playlist_id])
    @host_id = Authorization.where(playlist_id: @playlist_q.id, status: "Host")[0].user_id

    if @songs_before.where(played: true).length == @songs_before.length
        @suggested_song = SuggestedSong.new(song_id: params[:song_id], user_id: session[:user_id], user_name: User.find(session[:user_id]).first_name, playlist_id: params[:playlist_id], name: params[:name], artist: params[:artist])
       if SuggestedSong.where(playlist_id: params[:playlist_id], song_id: params[:song_id]).count > 0 &&
        (SuggestedSong.where(playlist_id: params[:playlist_id], song_id: params[:song_id])).last.played == false
        render json: {message: "Track is already Q'd up", status: false}
       else
        @suggested_song.save
        render json: {message: "Song added!", status: true}
        @songs = SuggestedSong.playlist_songs(params[:playlist_id])
        ActionCable.server.broadcast(:app, [@songs, "restart"])
      end
     
    else

      @suggested_song = SuggestedSong.new(song_id: params[:song_id], user_id: session[:user_id], user_name: User.find(session[:user_id]).first_name, playlist_id: params[:playlist_id], name: params[:name], artist: params[:artist])

      if SuggestedSong.where(playlist_id: params[:playlist_id], song_id: params[:song_id]).count > 0 &&
        (SuggestedSong.where(playlist_id: params[:playlist_id], song_id: params[:song_id])).last.played == false
        render json: {message: "Track is already Q'd up", status: false}
       else
        @suggested_song.save
        render json: {message: "Song added!", status: true}
        @songs = SuggestedSong.playlist_songs(params[:playlist_id])
        ActionCable.server.broadcast(:app, [@songs])
       end


    end

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
    @playlist_q = Playlist.find(params[:playlist_id])
    @suggested_song = SuggestedSong.find_by(playlist_id: @playlist_q.id, id: params[:id])
    @suggested_song.destroy
    @songs = SuggestedSong.playlist_songs(params[:playlist_id])
    ActionCable.server.broadcast(:app, [@songs,'', @host_id])

  end

end
