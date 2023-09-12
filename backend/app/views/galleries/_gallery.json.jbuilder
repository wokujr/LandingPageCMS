json.extract! gallery, :id, :image_name, :created_at, :updated_at
json.url gallery_url(gallery, format: :json)
