module CompanyImagesHandler
  extend ActiveSupport::Concern

  def save_company_images
    content = parse_content
    image_blocks = filter_image_blocks(content)

    image_blocks.each do |image_block|
      signed_id =extract_signed_id(image_block)
      existing_image = find_existing_image(signed_id)
      if existing_image.nil?
        create_and_associate_images(signed_id)
      else
        update_existing_image(existing_image)
      end
    end
    delete_unused_image(content)
    delete_unassociated_image(existing_image)
  end
  delete_unused_images(content)
  delete_unassociated_images
end

private

def parse_content
  JSON.parse(content)
end

def filter_image_blocks(content)
  content['blocks'].select{ |block| block['type'] == 'image' }
end

def extract_signed_id(image_block)
  url = image_block['data']['file']['url']
  url_segments = url.split('/')
  url_segments[-2]
end

def find_existing_image
  company_images.find{ |img|img.image.signed_id === signed_id }
end

def create_and_associate_image(signed_id)
  companyImage = CompanyImages.new(company: self )
  companyImage.image.attach(signed_id)
  companyImage.save
#   WAW i dont have idea, fr fr
  company_images << companyImage
end

def update_existing_image(existing_image)
  existing_image.update(company_id: id)
end

def delete_unused_images(content)
  images_to_delete = company_images.reject do |company_image|
    signed_id = company_image.image.signed_id
    content['blocks'].any?{ |block|
      block['type'] == 'image'&&
        block['data']['file']['url'].include?(signed_id)
    }
  end
end

def delete_unassociated_images
  CompanyImages.where(company_id: nil).destroy.all
end
