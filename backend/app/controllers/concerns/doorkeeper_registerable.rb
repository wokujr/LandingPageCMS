# frozen_string_literal: true

# module DoorkeeperRegisterable
#   extend ActiveSupport::Concern
#
#   def regenerate_refresh_token(user, client_app)
#     # Find the existing access token by the user and application
#     existing_token = Doorkeeper::AccessToken.find_by(resource_owner_id: user.id, application_id: client_app.id)
#
#     if existing_token
#       # Delete the existing refresh token
#       existing_token.revoke
#       existing_token.destroy
#     end
#
#     # Generate a new access token with a new refresh token
#     access_token = Doorkeeper::AccessToken.create!(
#       resource_owner_id: user.id,
#       application_id: client_app.id,
#       refresh_token: generate_refresh_token,
#       expires_in: Doorkeeper.configuration.access_token_expires_in.to_i,
#       scopes: ''
#     )
#
#     {
#       id: user.id,
#       email: user.email,
#       role: user.role,
#       access_token: access_token.token,
#       token_type: 'Bearer',
#       expires_in: access_token.expires_in,
#       refresh_token: access_token.refresh_token,
#       created_at: user.created_at.iso8601
#     }
#   end
#
#   private
#
#   def generate_refresh_token
#     loop do
#       # generate a random token string and return it
#       # unless there is already another token with the same string
#       token = SecureRandom.hex(32)
#       break token unless Doorkeeper::AccessToken.exists?(refresh_token: token)
#     end
#   end
# end


module DoorkeeperRegisterable
  extend ActiveSupport::Concern

  def generate_refresh_token
    loop do
      # generate a random token string and return it
      # unless there is already another token with the same string
      token = SecureRandom.hex(32)
      break token unless Doorkeeper::AccessToken.exists?(refresh_token: token)
    end
  end

  def render_user(user, client_app, token_type = 'Bearer')
    access_token = Doorkeeper::AccessToken.create(resource_owner_id: user.id,
                                                  application_id: client_app.id,
                                                  refresh_token: generate_refresh_token,
                                                  expires_in: Doorkeeper.configuration.access_token_expires_in.to_i,
                                                  scopes: '')

    {
      id: user.id,
      email: user.email,
      role: user.role,
      access_token: access_token.token,
      token_type: token_type,
      expires_in: access_token.expires_in,
      refresh_token: access_token.refresh_token,
      created_at: user.created_at.iso8601
    }
  end
end
