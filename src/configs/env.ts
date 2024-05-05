import { config } from 'dotenv';
config();

interface Vars {
  port: number;
  origins: string[] | string;
  db_user: string;
  db_pass: string;
  db_host: string;
  db_port: number;
  db_name: string;
}

let vars: Partial<Vars> = {
  db_user: process.env.DB_USER,
  db_pass: process.env.DB_PASS,
  db_host: process.env.DB_HOST,
  db_port: +(process.env.DB_PORT as string),
  db_name: process.env.DB_NAME,
};

if (process.env.ENV == 'development') {
  vars = {
    ...vars,
    port: 3000,
    origins: '*',
  };
  console.log('---- Running on development environment ----');
} else {
  vars = {
    ...vars,
    port: +(process.env.PORT as string),
    origins: process.env.ORIGINS,
  };
  console.log('---- Running on production environment ----');
}

export default vars;
