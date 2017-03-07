class SessionsController < ApplicationController

  def new

  end

  # def create
  #   @access = params[:code]
  #   response = HTTParty.get("https://connect.deezer.com/oauth/access_token.php?app_id=#{ENV["deezer_application_id"]}&secret=#{ENV["deezer_secret_key"]}&code=#{params[:code]}&output=json")
  #
  #   access_token = response["access_token"]
  #   new_song = HTTParty.get("http://api.deezer.com/search?q=eminem&#{access_token}")
  # end
  #
  # def destroy
  # end


  def create
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to user_path(user.id), notice: "Logged In!"
    else
      flash.now[:alert] = "Invalid email or password!"
      render "new"
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path, notice: "Logged out!"
  end

  def view
  end

end
