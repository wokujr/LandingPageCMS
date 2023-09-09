Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # change to ULR or IP later like origins 'https://something.com'
    origins '*'

    resource '*',
             headers: :any,
             methods: %i[get post patch put delete]
  end
end