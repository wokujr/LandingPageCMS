module Api
  module V1
    class CompaniesController < ApplicationController
      before_action :set_company, only: %i[ show edit update destroy ]
      skip_before_action :verify_authenticity_token, raise: false

      def restricted
        devise_api_token = current_devise_api_token
        if devise_api_token
          render json: {message: "youre Logged in as #{devise_api_token.resource_owner.email}"}, status: :ok
        else
          render json: {message: "you are not logged in"}, status:  :unauthorized
        end
      end

      # GET /companies or /companies.json
      def index
        @companies = Company.order(created_at: :desc)
        render json: @companies
      end

      # GET /companies/1 or /companies/1.json
      def show
        set_company
        render json: company_json(@company)
      end

      def edit
        set_company
        render json: company_json(@company)
      end

      # POST /companies or /companies.json
      def create
        @company = Company.new(company_params)
        if @company.save
          render json: @company, status: :created, location: api_v1_company_path(@company)
        else
          render json: @company.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /companies/1 or /companies/1.json
      def update
        if @company.update(company_params)
          render json: company_json(@company)
        else
          render json: @company.errors, status: :unprocessable_entity
        end
      end

      # DELETE /companies/1 or /companies/1.json
      def destroy
        set_company
        @company.destroy
      end

      def latest
        @company = Company.last
        render json: CompanySerializer.new(@company).serializable_hash[:data][:attributes]
      end

      # Update ImageForTeam function/method whatever
      def upload_image
        set_company
        @company.image.purge if @company.image.attached? # Remove previous image
        @company.image.attach(params[:image]) # Attach the new image
      end

      def upload_video
        set_company
        @company.video.purge if @company.video.attached? # Remove previous video
        @company.video.attach(params[:video]) # Attach the new video
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_company
        @company = Company.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def company_params
        params.require(:company).permit( :id, :title, :body, :image, :video)
      end

      def company_json(company)
        {
          id: company.id,
          title: company.title,
          body: company.body,
          image_url: company.image.attached? ? url_for(company.image) : nil,
          video_url: company.video.attached? ? url_for(company.video) : nil,
          created_at: company.created_at,
          updated_at: company.updated_at
        }
      end

    end
  end
end
