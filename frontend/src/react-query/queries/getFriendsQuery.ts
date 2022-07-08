import axios from 'axios';
import { friend } from '../../types';
import cookies from 'js-cookie';

export const getFriendsQuery = async (): Promise<friend[]> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/friends`,

    {
      headers: {
        authorization: cookies.get('token'),
      },
    }
  );
  return response.data.data;
};
