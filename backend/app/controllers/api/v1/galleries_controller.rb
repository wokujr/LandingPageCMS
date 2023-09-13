class Api::V1::GalleriesController < ApplicationController
  before_action :set_gallery, only: %i[ show update destroy ]
  skip_before_action :verify_authenticity_token, raise: false

  # GET /galleries
  # GET /galleries.json
  def index
    @galleries = Gallery.order(created_at: :desc)
    render json: GallerySerializer.new(@galleries).serializable_hash[:data].map {|team| team[:attributes]}
  end

  # GET /galleries/1
  # GET /galleries/1.json
  def show
    render json: @gallery.as_json(include: :images).merge(
      images: @gallery.images.map do |image|
        url_for(image)
      end
    )
  end

  # POST /galleries
  # POST /galleries.json
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

  # PATCH/PUT /galleries/1
  # PATCH/PUT /galleries/1.json
  def update
    if @gallery.update(gallery_params)
      render :show, status: :ok, location: @gallery
    else
      render json: @gallery.errors, status: :unprocessable_entity
    end
  end

  # DELETE /galleries/1
  # DELETE /galleries/1.json
  def destroy
    @gallery.destroy

    respond_to do |format|
      format.json { head :no_content }
    end
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
