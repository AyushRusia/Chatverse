import axios from 'axios';
import Cookies from 'js-cookie';

export const sendInvitation = async (reciever_id: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sendInvite`,
      { reciever_id },
      {
        headers: {
          authorization: Cookies.get('token'),
        },
      }
    );
    return response.data;
  } catch (err) {
    return err;
  }
};
