class PlaylistsController < ApplicationController

  def index
    # spotify_user = RSpotify::User.new(session[:user])
    # @my_playlist = spotify_user.create_playlist!('my-playlist')
    response = HTTParty.get("https://connect.deezer.com/oauth/access_token.php?app_id=#{ENV["deezer_application_id"]}&secret=#{ENV["deezer_secret_key"]}&code=#{params[:code]}&output=json")

    access_token = response["access_token"]
    @albums = HTTParty.get("http://api.deezer.com/search/album?q=#{params[:search]}&#{access_token}")
    @tracks = HTTParty.get("http://api.deezer.com/search/track?q=#{params[:search]}&#{access_token}")
    @playlists = HTTParty.get("http://api.deezer.com/search/playlist?q=#{params[:search]}&#{access_token}")
    @artists = HTTParty.get("http://api.deezer.com/search/artist?q=#{params[:search]}&#{access_token}")

    # if params[:search]
    #   @artists = RSpotify::Artist.search(params[:search])
    #   @albums = RSpotify::Album.search(params[:search])
    #   @tracks = RSpotify::Track.search(params[:search])
    #   @playlists = RSpotify::Playlist.search(params[:search])
    # else
    #   @artists = []
    #   @albums = []
    #   @tracks = []
    #   @playlists= []
    # end
  end

  def show
    @playlist_q = Playlist.find(params[:id])

    @playlist_q_songs = SuggestedSongs.where(playlist_id:params[:id])
  end

  def new
    @playlist = Playlist.new
    @themes = ['House/EDM', 'Rock', 'Pop', 'Rap', 'Hip-Hop', 'R&B', 'Country', 'Other']
  end

  def destroy
    @playlist_q = Playlist.find(params[:id])
    if @playlist_q.destroy
      redirect_to playlists_path
    end
  end

  def create

    if @playlist_q = Playlist.create(
      name: playlist_params[:name],
      description: playlist_params[:description],
      theme: playlist_params[:theme],
      redirect_to playlist_path(@playlist_q)
    end

  end

  def edit
    @playlist_q = Playlist.find(params[:id])
    @themes = ['House/EDM', 'Rock', 'Pop', 'Rap', 'Hip-Hop', 'R&B', 'Country', 'Other']
  end

  def update
    @playlist_q = Playlist.find(params[:id])
      if @playlist_q.update_attributes(playlist_params)
        redirect_to playlist_path(@playlist_q)
      else
        render :edit
      end
  end



private

  def playlist_params
      params.require(:playlist).permit(:name, :description, :theme)
  end

end
