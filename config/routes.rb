Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "playlists#index"

  resources :users
  resources :playlists do
    resources :suggestedsongs do
      resources :votes
    end
  end
  resources :sessions, only: [:new, :create, :destroy]

get '/auth/deezer/callback', to: 'sessions#create'
end
