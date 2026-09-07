class AuthorsController < ApplicationController

  def index
    @authors = Author.all
  end

  def new
    @author = Author.new
  end

  def create
    @author = Author.new(author_params)

    if @author.save
      flash[:notice] = "Author was created successfully."
      redirect_to @author
    else
      render 'new', status: :unprocessable_entity
    end
  end

  def show
    @author = Author.find(params[:id])

    respond_to do |format|
      format.html
      format.json do 
        render json:{
          id: @author.id,
          first_name: @author.first_name,
          last_name: @author.last_name,
          date_of_birth: @author.date_of_birth,
          books: @author.books.map do |book|
            {
              id: book.id,
              book_title: book.book_title
            }
          end
        }
      end
    end
  end

  def edit
  	@author = Author.find(params[:id])
  end

  def update
  
  	@author = Author.find(params[:id])

  	if @author.update(author_params)
  		flash[:notice] = "Author was updated successfully."
  		redirect_to @author
  	else
  		render 'edit', status: :unprocessable_entity
  	end
  end


  def destroy
  		
  		@author = Author.find(params[:id])
  		@author.destroy

  		flash[:notice] = " Author was deleted successfully"
  		redirect_to authors_path
  end



  def author_params
    params.require(:author).permit(:first_name, :last_name, :date_of_birth)
  end

end