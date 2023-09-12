class TeamSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :position, :image, :image_url, :created_at, :updated_at
end