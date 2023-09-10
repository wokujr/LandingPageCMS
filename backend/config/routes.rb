# frozen_string_literal: true
Rails.application.routes.draw do
  use_doorkeeper
  devise_for :users
  draw :api

  # resources :posts
  # resources :teams
  # resources :companies do
  #   member do
  #     post 'upload_image'
  #     post 'upload_video'
  #   end
  # end
  root 'api/v1/companies#index'
end
