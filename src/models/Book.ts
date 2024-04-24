class Book {
  book_id: number // Initialize with default value
  book_name: string
  book_desc: string
  book_author: string
  book_category: string
  book_image: string
  created_at: Date
  updated_at: Date

  constructor(
    book_id: number,
    book_name: string,
    book_desc: string,
    book_author: string,
    book_category: string,
    book_image: string,
    created_at: Date,
    updated_at: Date,
  ) {
    this.book_id = book_id
    this.book_name = book_name
    this.book_desc = book_desc
    this.book_author = book_author
    this.book_category = book_category
    this.book_image = book_image
    this.created_at = created_at
    this.updated_at = updated_at
  }
}
