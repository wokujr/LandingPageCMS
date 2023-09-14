class Api::V1::GalleriesController < ApplicationController
  before_action :set_gallery, only: %i[ show update destroy ]
  skip_before_action :verify_authenticity_token, raise: false

  def index
    @galleries = Gallery.order(created_at: :desc)
    render json: @galleries.as_json
  end

  def show
    render json: @gallery.as_json
  end

  def create
    @gallery = Gallery.new(gallery_params.except(:images))
    @gallery.image_name = params[:gallery][:image_name]
    images = params[:gallery][:images]
    if images
      images.each do |image|
        @gallery.images.attach(image)
      end
    end
    if @gallery.save
      render :show, status: :created, location: @gallery
    else
      render json: @gallery.errors, status: :unprocessable_entity
    end
  end

  def update
    images = params[:gallery][:images]
    if images
      images.each do |image|
        @gallery.images.attach(image)
      end
    end
    if @gallery.save
      render json: @gallery
    end
  end

  def destroy
    gallery = Gallery.find(params[:id])
    image = gallery.image.find(params[:image_id])
    image.purge
    gallery.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  def upload_new_image
    gallery = Gallery.find(params[:id])
    gallery.images.attach(params[:new_image]) # Attach the new image
    render json: gallery
  end

  def remove_image
    @image = ActiveStorage::Attachment.find(params[:id])
    @image.purge_later
    redirect_back(fallback_location: request.referer)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
  def set_gallery
    @gallery = Gallery.find(params[:id])
  end

    # Only allow a list of trusted parameters through.
  def gallery_params
    params.require(:gallery).permit(:image_name, images: [])
  end

end
