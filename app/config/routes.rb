# frozen_string_literal: true

Rails.application.routes.draw do

  resources :category, only: :index
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root to: "session#login"

  root "home#index"
  get '*path', to: 'home#index', via: :all
end
