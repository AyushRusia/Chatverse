import axios from 'axios';
import { person } from '../../types';
import cookies from 'js-cookie';
export const viewerQuery = async (): Promise<person> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/viewer`,
    {
      headers: {
        authorization: cookies.get('token'),
      },
    }
  );
  return response.data.data;
};
