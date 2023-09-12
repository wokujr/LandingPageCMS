# frozen_string_literal: true
class Api::V1::TeamsController < ApplicationController
  before_action :set_team, only: %i[ show update destroy ]
  skip_before_action :verify_authenticity_token, raise: false

  # GET /teams
  # GET /teams.json
  def index
    @teams = Team.order(created_at: :desc)
    render json: TeamSerializer.new(@teams).serializable_hash[:data].map { |team| team[:attributes] }
  end

  # GET /teams/1
  # GET /teams/1.json
  def show

    render json: TeamSerializer.new(@team).serializable_hash[:data][:attributes]
  end

  # POST /teams
  # POST /teams.json
  def create
    @team = Team.new(team_params)

    if @team.save
      render :show, status: :created, location: @team
    else
      render json: @team.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /teams/1
  # PATCH/PUT /teams/1.json
  def update
    if @team.update(team_params)
      render :show, status: :ok, location: @team
    else
      render json: @team.errors, status: :unprocessable_entity
    end
  end

  # DELETE /teams/1
  # DELETE /teams/1.json
  def destroy
    @team.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_team
      @team = Team.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def team_params
      params.require(:team).permit(:name, :position, :image)
    end
end
