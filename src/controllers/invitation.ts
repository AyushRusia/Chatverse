import express from 'express';
import { Person } from '../models/user';
import { Invitation, Status } from '../models/invitation';
import { Friend } from '../models/friend';
const router = express.Router();
interface RequestWithUser extends express.Request {
  _id: string;
}

//Database

import { AppDataSource } from '../sql/connection';
const userRepository = AppDataSource.getRepository(Person);
const invitationRepository = AppDataSource.getRepository(Invitation);
const friendRepository = AppDataSource.getRepository(Friend);
import { v4 as uuidv4 } from 'uuid';

router.post('/persons', async (req: RequestWithUser, res: express.Response) => {
  try {
    // const _id = req._id;
    const { key } = req.body;
    const user_id = req._id;

    // Fetching Relavent 10 Users
    const users = await userRepository
      .createQueryBuilder('person')
      .where('person.name ilike :key', { key: `${key}%` })
      .take(10)
      .getMany();

    console.log(users);

    // Filtering such that request is sent or not

    const filterdusers = users.map(async (user) => {
      const check1 = await invitationRepository.findOneBy({
        sender_id: user_id,
        reciever_id: user._id,
      });

      if (check1) {
        console.log('check1 true');
        return null;
      }

      const check2 = await invitationRepository.findOneBy({
        sender_id: user._id,
        reciever_id: user_id,
      });

      if (check2) {
        console.log('check2 true');
        return null;
      }

      return user;
    });

    const result = await Promise.all(filterdusers);
    const final = result.filter((user) => user);
    res.status(200).json({ data: final });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//get all send invitations
router.get(
  '/sendInvite',
  async (req: RequestWithUser, res: express.Response) => {
    try {
      console.log('aai');

      const sender_id = req._id;
      const senderData = await userRepository.findOneBy({ _id: sender_id });
      const ids = await invitationRepository
        .createQueryBuilder('invitation')
        .select(['invitation._id', 'invitation.reciever_id'])
        .where('invitation.sender_id = :id', { id: `${sender_id}` })
        .andWhere('invitation.status = :status', {
          status: `${Status.PENDING}`,
        })
        .getMany();

      const promises = ids.map(async (id) => {
        const recieverData = await userRepository.findOneBy({
          _id: id.reciever_id,
        });

        return {
          _id: id._id,
          senderName: senderData.name,
          senderEmail: senderData.email,
          senderProfile: senderData.profile,

          recieverName: recieverData.name,
          recieverEmail: recieverData.email,
          recieverProfile: recieverData.profile,
        };
      });

      const result = await Promise.all(promises);
      res.status(200).json({ data: result });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// send invitation
router.post(
  '/sendInvite',
  async (req: RequestWithUser, res: express.Response) => {
    try {
      const sender_id = req._id;
      const reciever_id = req.body.reciever_id;

      const check = await invitationRepository.findOneBy({
        sender_id,
        reciever_id,
      });

      if (check)
        return res.status(400).json({ data: 'Invitation Already Send' });

      const invitation = new Invitation();

      invitation._id = uuidv4();
      invitation.sender_id = sender_id;
      invitation.reciever_id = reciever_id;
      invitation.status = Status.PENDING;

      const result = await invitationRepository.save(invitation);

      return res.status(200).json({ data: result });
    } catch (err) {
      console.log(err);

      res.status(500).json({ data: 'Internal Server Error' });
    }
  }
);
router.get(
  '/recieveInvite',
  async (req: RequestWithUser, res: express.Response) => {
    try {
      console.log('aai');

      const reciever_id = req._id;
      const recieverData = await userRepository.findOneBy({ _id: reciever_id });
      const ids = await invitationRepository
        .createQueryBuilder('invitation')
        .select(['invitation._id', 'invitation.sender_id'])
        .where('invitation.reciever_id = :id', { id: `${reciever_id}` })
        .andWhere('invitation.status = :status', {
          status: `${Status.PENDING}`,
        })
        .getMany();

      const promises = ids.map(async (id) => {
        const senderData = await userRepository.findOneBy({
          _id: id.sender_id,
        });

        return {
          _id: id._id,
          senderName: senderData.name,
          senderEmail: senderData.email,
          senderProfile: senderData.profile,

          recieverName: recieverData.name,
          recieverEmail: recieverData.email,
          recieverProfile: recieverData.profile,
        };
      });

      const result = await Promise.all(promises);
      res.status(200).json({ data: result });
    } catch (err) {
      console.log(err);
      res.send('Err');
    }
  }
);
router.post(
  '/acceptInvite',
  async (req: RequestWithUser, res: express.Response) => {
    try {
      const reciever_id = req._id;
      const invitation_id = req.body.reciever_id;

      const check = await invitationRepository.findOneBy({
        _id: invitation_id,
      });

      if (!check) return res.status(400).json({ error: 'No Invitation Find' });

      if (check.status == Status.ACCEPETD || check.status == Status.REJECTED)
        return res.status(400).json({ error: 'Invalid Request' });

      const friend = new Friend();

      friend._id = uuidv4();
      friend.user1 = check.sender_id;
      friend.user2 = check.reciever_id;

      const result = await friendRepository.save(friend);

      await invitationRepository.update(
        { _id: check._id },
        { status: Status.ACCEPETD }
      );
      return res.status(200).json({ data: result });
    } catch (err) {
      console.log(err);

      res.status(500).json({ data: 'Internal Server Error' });
    }
  }
);

router.post(
  '/deleteInvite',
  async (req: RequestWithUser, res: express.Response) => {
    try {
      const deleteId = req.body.delete_id;
      await invitationRepository.delete({ _id: deleteId });
      return res.send('deleted');
    } catch (err) {
      console.log('error');
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

export default router;
