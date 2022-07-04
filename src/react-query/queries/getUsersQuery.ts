import axios from 'axios';
import { person } from '../../types';
import cookies from 'js-cookie';

export const getUsersQuery = async (key: string): Promise<person[]> => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/persons`,
    { key: key },
    {
      headers: {
        authorization: cookies.get('token'),
      },
    }
  );
  return response.data.data;
};
