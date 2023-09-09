# frozen_string_literal: true
Rails.application.routes.draw do

  # API route will be in api/v1
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
      get 'latest', to: 'companies#latest'
    end
  end
  root 'api/v1/companies#index'
end
