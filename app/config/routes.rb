# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, 
    path: '', 
    path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
    controllers: {
      sessions: "users/sessions",
      registrations: "users/registrations"
    }

  # devise_scope :user do
  #   authenticated :user do
  #     root 'home#index', as: :authenticated_root
  #   end

    # unauthenticated do
    #   root '', as: :unauthenticated_root
    # end
  # end

  get '/current_user', to: 'current_user#index'
  resources :category, only: [:index, :create, :update, :destroy]

  # Defines the root path route ("/")
  root to: "home#index"
  get "*path", to: "home#index", via: :all
end
