Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users
  resources :playlists do
    resources :suggestedsongs do
      resources :votes
    end
  end
  resources :sessions, only: [:new, :create, :destroy]

get '/auth/spotify/callback', to: 'users#spotify'
end
