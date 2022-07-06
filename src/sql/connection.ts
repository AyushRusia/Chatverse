// import { Pool } from 'pg';

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   database: 'test',
//   password: 'postgres',
// });

// export default pool;

import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Chat } from '../models/chat';
import { Friend } from '../models/friend';
import { Invitation } from '../models/invitation';
import { Person } from '../models/user';
import dotenv from 'dotenv';
dotenv.config();
export const AppDataSource = new DataSource({
  type: 'postgres',
  url: `${process.env.DB_URL}`,
  synchronize: true,
  logging: false,
  entities: [Person, Invitation, Friend, Chat],
  migrations: [],
  subscribers: [],
});
