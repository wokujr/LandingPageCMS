class Company < ApplicationRecord
  has_one_attached :image, dependent: :destroy
  has_one_attached :video, dependent: :destroy

  def image_url
    Rails.application.routes.url_helpers.url_for(image) if image.attached?
  end

  def video_url
    Rails.application.routes.url_helpers.url_for(video) if video.attached?
  end
end
