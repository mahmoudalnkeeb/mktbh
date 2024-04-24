import { Pool } from 'pg'
import vars from './env'

const dbConfig = {
  user: vars.db_user,
  password: vars.db_pass,
  host: vars.db_host,
  port: vars.db_port,
  database: vars.db_name,
}

const pool = new Pool(dbConfig)

export default pool
