json.company do
  json.extract! @company, :id, :title, :body
  json.image_url url_for(@company.image) if @company.image.attached?
  json.video_url url_for(@company.video) if @company.video.attached?
end