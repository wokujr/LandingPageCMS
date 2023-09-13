class Gallery < ApplicationRecord
  has_many_attached :images, dependent: :destroy

  def image_urls
    images.map { |image| Rails.application.routes.url_helpers.url_for(image) }
  end

end
