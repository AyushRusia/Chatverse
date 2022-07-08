import axios from 'axios';
import { invitation } from '../../types';
import cookies from 'js-cookie';

export const sentInvitationsQuery = async (): Promise<invitation[]> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sendInvite`,
    {
      headers: {
        authorization: cookies.get('token'),
      },
    }
  );
  return response.data.data;
};
