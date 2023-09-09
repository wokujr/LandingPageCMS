class Team < ApplicationRecord

  self.primary_key = :id
  before_create :generate_uuid


  private

  def generate_uuid
    self.id ||= SecureRandom.uuid
  end
end
