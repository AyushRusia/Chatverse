import express from 'express';
const app = express();

//Database
import { AppDataSource } from './sql/connection';

import router from './controllers/auth';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

app.use(cors());
app.use(express.json());
app.use('/auth', router);

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
