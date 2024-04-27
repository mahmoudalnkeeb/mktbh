import Book from '../models/Book';

class BookRepository {
  constructor(BookModel: Book) {}

  async readOne(id: number) {}
  async read(page: number, limit: number) {}

  // limited access resources
  async create() {}
  async update() {}
  async delete() {}
}

