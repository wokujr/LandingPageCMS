class CompanySerializer
  include JSONAPI::Serializer
  attributes :id, :title, :body, :image, :image_url, :video, :video_url, :created_at, :updated_at
end
# :videos :video_url