class ContentsController < ApplicationController

  def index
    @contents = Content.all

    respond_to do |format|
      format.html
      format.json { render json: @contents }
    end

  end

  def show
    @contents = Content.find(params[:id])
  end

end