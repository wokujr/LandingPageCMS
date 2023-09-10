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

scope :api do
  scope :v1 do
    use_doorkeeper do
      skip_controllers :authorizations, :applications, :authorized_applications
    end
  end
end