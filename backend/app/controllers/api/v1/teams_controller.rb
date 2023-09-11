class Api::V1::TeamsController < ApplicationController
  before_action :set_team, only: %i[ show edit update destroy ]
  skip_before_action :verify_authenticity_token, raise: false

  # GET /teams or /teams.json
  def index
    @teams = Team.all
    render json: @teams
  end

  # GET /teams/1 or /teams/1.json
  def show
    set_team
    render json: @team
  end

  # GET /teams/new
  def new
    @team = Team.new
  end

  # POST /teams or /teams.json
  def create
    @team = Team.new(team_params)
    respond_to do |format|
      if @team.save
        format.json { render :show, status: :created, location: @team }
      else
        format.json { render json: @team.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /teams/1 or /teams/1.json
  def update
    @team = Team.find(params[:id])
    respond_to do |format|
      if @team.update(team_params)
        if params[:team][:image].present?
          @team.save
        end
        format.json { render :show, status: :ok, location: api_v1_teams_url(@team) }
      else
        format.json { render json: api_v1_teams_url(@team).errors, status: :unprocessable_entity }
      end
    end
  end


  # DELETE /teams/1 or /teams/1.json
  def destroy
    @team.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_team
      @team = Team.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def team_params
      params.require(:team).permit(:name, :title, :image)
    end
end
