class ContentsController < ApplicationController

  def index
    @contents = Content.all

    respond_to do |format|
      format.html
      format.json { render json: @contents }
    end
  end

end