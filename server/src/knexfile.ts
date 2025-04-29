import dotenv from 'dotenv';
dotenv.config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '1234',
      database: 'shop',
      port: 5432
    },
    migrations: {
      directory: './migrations'
    }
  }
};