class Company < ApplicationRecord
  has_one_attached :video
  has_one_attached :image

  def video_url
    Rails.application.routes.url_helpers.url_for(video) if video.attached?
  end

  def image_url
    Rails.application.routes.url_helpers.url_for(image) if video.attached?
  end

end


