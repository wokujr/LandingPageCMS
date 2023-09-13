class Api::V1::CompaniesController < ApplicationController
  before_action :set_company, only: %i[ show update destroy ]
  skip_before_action :verify_authenticity_token, raise: false


  # GET /companies
  # GET /companies.json
  def index
    @companies = Company.order(created_at: :desc)
    render json: @companies
  end

  # GET /companies/1
  # GET /companies/1.json
  def show
    set_company
    render json: company_json(@company)
  end

  def edit
    set_company
    render json: company_json(@company)
  end

  # POST /companies
  # POST /companies.json
  def create
    @company = Company.new(company_params)
    if @company.save
      render json: @company, status: :created, location: api_v1_company_path(@company)
    else
      render json: @company.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /companies/1
  # PATCH/PUT /companies/1.json
  def update
    if @company.update(company_params)
      render json: company_json(@company)
    else
      render json: @company.errors, status: :unprocessable_entity
    end
  end

  # DELETE /companies/1
  # DELETE /companies/1.json
  def destroy
    set_company
    @company.destroy
  end

  def latest
    @company = Company.last
    render json: CompanySerializer.new(@company).serializable_hash[:data][:attributes]
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
