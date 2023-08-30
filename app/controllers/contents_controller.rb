class ContentsController < ApplicationController

  def index
    @contents = Content.all

    respond_to do |format|
      format.html
      format.json { render json: @contents }
    end

  end

  def show
    @content = Content.find(params[:id])
  end

  def new

  end
  def create
    @content = Content.new(content_params)
    if @content.save
      redirect_to @content, notice: 'Content was successfully'
    else
      render :new , status: :unprocessable_entity
    end
  end

  private
  def content_params
    params.require(:contents).permit(:title, :body)

  end


end