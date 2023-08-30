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
    @content = Content.new
  end
  def create
    @content = Content.new(params.require(:contents).permit(:title, :body))
    if @content.save
      redirect_to content_path(@content), notice: 'Content was successfully Created.'
    else
      render :new, status:  :unprocessable_entity
    end
  end

  def edit
    @content = Content.find(params[:id])
  end
  def update
    @content = Content.find(params[:id])
    if @content.update(params.require(:content).permit(:title, :body))
      redirect_to content_path(@content), notice: 'Content was successfully updated.'
    else
      render 'edit', status: :unprocessable_entity, alert: "something went wrong"
    end
  end

  def destroy
    @content = Content.find(params[:id])
    if @content.destroy
      redirect_to contents_path, notice: "Post Successfully deleted"
    else
      render 'index', status: :unprocessable_entity
    end
  end


end