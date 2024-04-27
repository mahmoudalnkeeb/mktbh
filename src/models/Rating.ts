import { Model } from 'objection';
import User from './User';
import Book from './Book';
import knex from '../configs/database';
Model.knex(knex);

export interface RatingInterface {
  rating_id: number;
  book_id: number;
  user_id: number;
  rating: number;
  comment?: string;
  created_at: Date;
  updated_at: Date;
}

export default class Rating extends Model {
  static get tableName() {
    return 'ratings';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'ratings.user_id',
          to: 'users.user_id',
        },
      },
      book: {
        relation: Model.BelongsToOneRelation,
        modelClass: Book,
        join: {
          from: 'ratings.book_id',
          to: 'books.book_id',
        },
      },
    };
  }
}
