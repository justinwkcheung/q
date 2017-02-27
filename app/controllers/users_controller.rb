class UsersController < ApplicationController

  def spotify
     session[:user] = RSpotify::User.new(request.env['omniauth.auth'])
     redirect_to users_path
  end

  def index

  end

end
