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
import { Invitation } from '../models/invitation';
import { Person } from '../models/user';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'ormtest',
  synchronize: true,
  logging: false,
  entities: [Person, Invitation],
  migrations: [],
  subscribers: [],
});
