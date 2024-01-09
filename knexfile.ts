import { Knex } from "knex";
import { config as configDotenv } from "dotenv";

configDotenv();
const env = process.env.NODE_ENV || 'dev'

const config: Record<string, Knex.Config> = {
  dev: {
    client: 'mysql2',

    connection: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER,
      password: process.env.DB_PASS ,
      database: process.env.DB_SCHEMA
    },

    pool: {
      min: 2,
      max: 10
    },

    migrations: {
      tableName: 'db_migrations',
      directory: __dirname + '/dist/src/db/migrations'
    },

    // seeds: {
    //   directory: __dirname + '/dist/src/db/seeds'
    // }
  },
  make: {
    client: 'mysql2',

    connection: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER,
      password: process.env.DB_PASS ,
      database: process.env.DB_SCHEMA
    },


    pool: {
      min: 2,
      max: 10
    },

    migrations: {
      tableName: 'db_migrations',
      directory: __dirname + '/src/db/migrations'
    },

    // seeds: {
    //   directory: __dirname + '/dist/src/db/seeds'
    // }
  }
};

export default config[env];
