class SessionsController < ApplicationController

def new

end

def create
  # @access = params[:code]
  # response = HTTParty.get("https://connect.deezer.com/oauth/access_token.php?app_id=#{ENV["deezer_application_id"]}&secret=#{ENV["deezer_secret_key"]}&code=#{params[:code]}&output=json")
  #
  # access_token = response["access_token"]
  #new_song = HTTParty.get("http://api.deezer.com/search?q=eminem&#{access_token}")
  # binding.pry
  
end

def destroy
end

def view
end

end
