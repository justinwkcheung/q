Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

get '/playlists/:playlist_id/suggestedsongs/access_token', to: 'suggestedsongs#access_token', as: 'access_token'

get '/playlists/:id/update_song/', to: 'playlists#update_song', as: 'update_song'

get '/playlists/join', to: 'playlists#join', as: 'join'

post '/playlists/add_guest', to: 'playlists#add_guest', as: 'add_guest'

  get '/playlists/player', to: 'playlists#player'
  root "playlists#index"

  resources :users
  resources :playlists do
    resources :suggestedsongs do
      resources :votes
    end
  end
  resources :sessions, only: [:new, :create, :destroy]


  get '/playlists/:id/next_song', to: 'playlists#next_song', as: 'next_song'
  mount ActionCable.server => '/cable'

  # get '/auth/deezer/callback', to: 'sessions#create'
end
