import express from 'express';
import jwt from 'jsonwebtoken';

interface RequestWithUser extends express.Request {
  _id: string;
}
async function authorize(
  req: RequestWithUser,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(400).json('unauthorised');

    const verified: any = await jwt.verify(token, process.env.JWT_KEY);

    if (!verified) return res.status(400).json('token does not matched');

    req._id = verified.user;

    next();
  } catch (e) {
    console.log(e);
    res.status(400).json('unauthorised');
  }
}

export default authorize;
