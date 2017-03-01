class SessionsController < ApplicationController

def new
end

def create
binding.p
redirect_to "https://connect.deezer.com/oauth/access_token.php?app_id=226622&secret=c5676262396ca51694f701a60b3c2f02&code=#{params[:code]}&output=json"
end

def destroy
end

def view
end

end
