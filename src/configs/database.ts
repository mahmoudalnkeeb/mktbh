import vars from './env';
import Knex from 'knex';

const knex = Knex({
  client: 'pg',
  connection: {
    user: vars.db_user,
    password: vars.db_pass,
    host: vars.db_host,
    port: vars.db_port,
    database: vars.db_name,
  },
  migrations: {
    directory: './src/migrations',
  },
});

export default knex;
