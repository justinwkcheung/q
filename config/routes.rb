Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

get '/playlists/:id/update_song/', to: 'playlists#update_song', as: 'update_song'

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

  # get '/auth/deezer/callback', to: 'sessions#create'
end
