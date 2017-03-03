class SessionsController < ApplicationController

  def new

  end

  def create
    user = User.find_by(email: params[:email])
    # binding.pry
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      # binding.pry
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
