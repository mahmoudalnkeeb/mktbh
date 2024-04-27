import { Model } from 'objection';
import User from './User';
import Author from './Author';
import Rating from './Rating';
import Subject from './Subject';
import knex from '../configs/database';
Model.knex(knex);

export interface BookInterface {
  book_id: number;
  title: string;
  cover_image?: string;
  description?: string;
  language?: string;
  added_by?: number;
  created_at: Date;
  updated_at: Date;
}

export default class Book extends Model {
  static get tableName() {
    return 'books';
  }

  static get relationMappings() {
    return {
      addedBy: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'books.added_by',
          to: 'users.user_id',
        },
      },
      authors: {
        relation: Model.ManyToManyRelation,
        modelClass: Author,
        join: {
          from: 'books.book_id',
          through: {
            from: 'author_books.book_id',
            to: 'author_books.author_id',
          },
          to: 'authors.author_id',
        },
      },
      ratings: {
        relation: Model.HasManyRelation,
        modelClass: Rating,
        join: {
          from: 'books.book_id',
          to: 'ratings.book_id',
        },
      },
      subjects: {
        relation: Model.ManyToManyRelation,
        modelClass: Subject,
        join: {
          from: 'books.book_id',
          through: {
            from: 'book_subjects.book_id',
            to: 'book_subjects.subject_id',
          },
          to: 'subjects.subject_id',
        },
      },
    };
  }
}
