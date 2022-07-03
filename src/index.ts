import express from 'express';
const app = express();

//Database
import { AppDataSource } from './sql/connection';

import Authrouter from './controllers/auth';
import Apirouter from './controllers/invitation';
import cors from 'cors';
import dotenv from 'dotenv';
import authorize from './middleware/auth';
dotenv.config();

app.use(cors());
app.use(express.json());
app.use('/auth', Authrouter);
app.use('/api', authorize, Apirouter);

AppDataSource.initialize()
  .then(() => {
    app.listen(8080, () => {
      console.log('Listning to port 8080');
    });
  })
  .catch((e: any) => {
    console.log(e);
    console.log('Error Something went wrong');
  });
