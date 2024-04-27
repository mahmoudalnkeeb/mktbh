import { Model } from 'objection';
import Book from './Book';
import knex from '../configs/database';
Model.knex(knex);

export interface AuthorInterface {
  author_id: number;
  name: string;
  description?: string;
  image?: string;
  created_at: Date;
  updated_at: Date;
}

export default class Author extends Model {
  static get tableName() {
    return 'authors';
  }

  static get relationMappings() {
    return {
      books: {
        relation: Model.ManyToManyRelation,
        modelClass: Book,
        join: {
          from: 'authors.author_id',
          through: {
            from: 'author_books.author_id',
            to: 'author_books.book_id',
          },
          to: 'books.book_id',
        },
      },
    };
  }
}
