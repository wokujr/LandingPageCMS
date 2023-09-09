module Api
  module V1
    class PostsController < ApplicationController
      before_action :set_post, only: %i[ show edit update destroy ]
      skip_before_action :verify_authenticity_token

      # GET /posts or /posts.json
      def index
        @posts = Post.order(created_at: :desc)

        respond_to do |format|
          format.html
          format.json {render json: @posts}
        end
      end

      # GET /posts/1 or /posts/1.json
      def show
        respond_to do |format|
          format.html
          format.json{render json:@post}
        end
      end

      # GET /posts/new
      def new
        @posts = Post.new
      end

      # GET /posts/1/edit
      def edit
      end

      # POST /posts or /posts.json
      def create
        @post = Post.new(post_params)

        respond_to do |format|
          if @post.save
            format.html { redirect_to api_v1_post_url(@post), notice: "Post was successfully created." }
            format.json { render json: @post, status: :created, location: api_v1_post_url(@post) }
          else
            format.html { render :new, status: :unprocessable_entity }
            format.json { render json: @post.errors, status: :unprocessable_entity }
          end
        end
      end

      # PATCH/PUT /posts/1 or /posts/1.json
      def update
        respond_to do |format|
          if @post.update(post_params)
            format.html { redirect_to api_v1_post_path(@post), notice: "Post was successfully updated." }
            format.json { render json: @post, status: :ok, location: @post }
          else
            format.html { render :edit, status: :unprocessable_entity }
            format.json { render json: @post.errors, status: :unprocessable_entity }
          end
        end
      end

      # DELETE /posts/1 or /posts/1.json
      def destroy
        @post.destroy

        respond_to do |format|
          format.html { redirect_to api_v1_posts_url, notice: "Post was successfully destroyed." }
          format.json { render json: Post.all, status: :ok }
        end
      end

      def post_json
        json_file_path = Rails.root.join('public', 'post.json')
        if File.exist?(json_file_path)
          send_file(json_file_path, type: 'application/json', disposition: 'inline')
        else
          # Handle the case when the file doesn't exist
          render json: { error: 'post.json not found' }, status: :not_found
        end
      end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_post
        @post = Post.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def post_params
        params.require(:post).permit(:title, :body, :id)
      end
    end
  end
end
