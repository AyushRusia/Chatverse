import axios from 'axios';
import Cookies from 'js-cookie';

export const deleteInvitation = async (_id: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deleteInvite`,
      { delete_id: _id },
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
