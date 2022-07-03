import axios from 'axios';
import { person } from '../../types';

export const viewerQuery = async (): Promise<person> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user`
  );
  return response.data;
};
