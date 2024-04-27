import { Model } from 'objection';
import knex from '../configs/database';
import Book from './Book';
import Subject from './Subject';
Model.knex(knex);

export interface BookSubjectInterface {
  id: number;
  book_id: number;
  subject_id: number;
}

export default class BookSubject extends Model {
  static get tableName() {
    return 'book_subjects';
  }

  static get relationMappings() {
    return {
      book: {
        relation: Model.BelongsToOneRelation,
        modelClass: Book,
        join: {
          from: 'book_subjects.book_id',
          to: 'books.book_id',
        },
      },
      subject: {
        relation: Model.BelongsToOneRelation,
        modelClass: Subject,
        join: {
          from: 'book_subjects.subject_id',
          to: 'subjects.subject_id',
        },
      },
    };
  }
}
