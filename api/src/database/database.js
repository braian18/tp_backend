import mysql from 'mysql2/promise';
import { envs } from '../config/envs.js';

const connection = await mysql.createConnection({
  host: envs.DB_HOST,
  port: envs.DB_PORT,
  user: envs.DB_USER,
  password: envs.DB_PASSWORD,
  database: envs.DB_NAME,
});

export const getConnection = async () => {
  console.log('connected to database');
  return connection;
};
