# frozen_string_literal: true

namespace :api do
  namespace :v1 do
    scope :users, module: :users do
      post '/', to: 'registrations#create', as: :user_registration
      patch '/', to: 'registrations#update_profile', as: :user_update_profile
    end
    resources :books
    resources :teams
    resources :contacts
    resources :galleries do
      member do
        post :upload_new_image
        delete :remove_image
        delete :delete_single_image
      end
    end
    resources :companies do
      member do
        post 'upload_image'
        post 'upload_video'
      end
    end
    get 'latest', to: 'companies#latest', as: 'latest_companies'
    get '/users/me', to: 'users#me'
  end
end

scope :api do
  scope :v1 do
    # Swagger documentation
    scope :swagger do
      get '/', to: 'apidocs#index', as: :swagger_root
      get '/data', to: 'apidocs#data', as: :swagger_data
    end
    use_doorkeeper do
      skip_controllers :authorizations, :applications, :authorized_applications
    end
  end
end
