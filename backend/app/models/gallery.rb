class Gallery < ApplicationRecord
  has_many_attached :images, dependent: :destroy
  
  def image_data
    images.map do |image|
      {
        image_blob: image.blob.id,
        image_attach_id: image.record.id,
        image_urls: Rails.application.routes.url_helpers.url_for(image)
      }
    end
  end

  def as_json(options = {})
    super(options.merge(methods: [:image_data]))
  end

end
