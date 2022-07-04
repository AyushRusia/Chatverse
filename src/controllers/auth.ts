import express from 'express';
const router = express.Router();

//Database
import { Person } from '../models/user';
import { AppDataSource } from '../sql/connection';
const userRepository = AppDataSource.getRepository(Person);

import Cloudinary from '../cloudinary';

//import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import dotenv from 'dotenv';
dotenv.config();
router.post(
  '/register',
  async (req: express.Request, res: express.Response) => {
    try {
      const { name, email, password, profile } = req.body;
      const check = await userRepository.findOneBy({ email: email });
      if (check) {
        console.log(check);
        return res.status(400).json({ error: 'Email Already Exist' });
      }

      //cloudinary

      const response = await Cloudinary.uploader.upload(profile, {
        upload_preset: process.env.CLOUDINARY_FOLDER_NAME,
      });

      const hashPassword = await bcrypt.hashSync(password, 4);
      const user = new Person();
      user._id = uuidv4();
      user.name = name;
      user.email = email;
      user.password = hashPassword;
      user.profile = response.url;

      const saveduser = await userRepository.save(user);

      return res.status(200).json({ data: saveduser });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

router.post('/login', async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    const check = await userRepository.findOneBy({ email: email });
    if (!check) return res.status(400).json({ error: 'Invalid Crediential' });

    const hash = await bcrypt.compareSync(password, check.password);
    if (!hash) return res.status(400).json({ error: 'Invalid Pass' });
    const token = await jwt.sign({ user: check._id }, process.env.JWT_KEY);
    return res.status(200).json({ token: token, user: check });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error });
  }
});

router.get('/user', async (req: express.Request, res: express.Response) => {
  try {
    return res.json({
      email: 'ayush@gmail.com',
      name: 'AYush',
      profile: 'ff',
      _id: 'dx',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error });
  }
});

export default router;
