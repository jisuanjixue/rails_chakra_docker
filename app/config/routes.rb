# frozen_string_literal: true

Rails.application.routes.draw do

  resources :category, only: [:index, :create, :update, :destroy]

  # Defines the root path route ("/")
  root to: "home#index"
  get '*path', to: 'home#index', via: :all
end
