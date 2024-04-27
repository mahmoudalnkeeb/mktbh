import { Model } from 'objection';
import knex from '../configs/database';
Model.knex(knex);

export interface SubjectInterface {
  subject_id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export default class Subject extends Model {
  static get tableName() {
    return 'subjects';
  }
}
