import { Model } from 'objection';
import knex from '../configs/database';
Model.knex(knex);

export interface UserInterface {
  user_id: number;
  email: string;
  firstname: string;
  lastname?: string;
  password: string;
  salt: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export default class User extends Model {
  static get tableName() {
    return 'users';
  }
}
