class BooksController < ApplicationController

  def index
    @books = Book.all
  end

  def new
    @book = Book.new
  end

  def create
    @book = Book.new(book_params)

    if @book.save
      flash[:notice] = "Book was created successfully."
      redirect_to @book
    else
      render 'new', status: :unprocessable_entity
    end
  end

  def show
    @book = Book.find(params[:id])

    respond_to do |format|
      format.html

      format.json do
        render json: {
          id: @book.id,
          book_title: @book.book_title,
          authors: @book.authors.map do |author|
            {
              id: author.id,
              first_name: author.first_name,
              last_name: author.last_name,
              date_of_birth: author.date_of_birth
            }
          end
        }
      end
    end
  end

  def edit
    @book = Book.find(params[:id])
  end

  def update
    @book = Book.find(params[:id])

    if @book.update(book_params)
      flash[:notice] = "Book was updated successfully"
      redirect_to @book
    else
      render 'edit', status: :unprocessable_entity
    end
  end

  def destroy
    @book = Book.find(params[:id])
    @book.destroy

    flash[:notice] = "Book was deleted successfully"
    redirect_to books_path
  end

  private

  def book_params
    params.require(:book).permit(:book_title, author_ids: [])
  end

end