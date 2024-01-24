import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '..', '..', '.env'),
});

console.log(process.env.PORT);

const PORT = process.env.PORT;
const APP_URL = process.env.URL ? process.env.URL : 'in future';
const NODE_ENV = process.env.NODE_ENV || 'dev';
const SECRET_JWT = process.env.SECRET_JWTF;

const configDataBase = {
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
};

export { configDataBase, PORT, APP_URL, NODE_ENV, SECRET_JWT };
