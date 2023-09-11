class Team < ApplicationRecord

  self.primary_key = :id
  before_create :generate_uuid
  mount_uploader :image, ImageUploader
  # serialize :image, JSON


  private

  def generate_uuid
    self.id ||= SecureRandom.uuid
  end
end
