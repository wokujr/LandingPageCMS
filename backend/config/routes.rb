# frozen_string_literal: true
Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :posts
      resources :teams
      resources :companies do
        member do
          post 'upload_image'
          post 'upload_video'
        end
      end
      get 'latest', to: 'companies#latest', as: 'latest_companies'
    end
  end

  get '/latest', to: 'api/v1/companies#latest', as: 'latest_companies'
  # root 'api/v1/companies#index'
end
