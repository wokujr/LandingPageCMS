class GallerySerializer
  include JSONAPI::Serializer
  attributes :id, :image_name, :created_at, :updated_at, :image_urls

end