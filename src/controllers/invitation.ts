import express from 'express';
const router = express.Router();
interface RequestWithUser extends express.Request {
  _id: string;
}

//Database
import { Person } from '../models/user';
import { AppDataSource } from '../sql/connection';
const userRepository = AppDataSource.getRepository(Person);
router.post('/persons', async (req: express.Request, res: express.Response) => {
  try {
    // const _id = req._id;
    const { key } = req.body;
    console.log(req.body);

    const users = await userRepository
      .createQueryBuilder('person')
      .where('person.name ilike :key', { key: `${key}%` })
      .getMany();

    console.log(users);
    res.status(200).json({ data: users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
