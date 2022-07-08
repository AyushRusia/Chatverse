import axios from 'axios';

interface loginProps {
  email: any;
  password: any;
}
export const loginMuattion = async (props: loginProps) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      { ...props }
    );
    return response.data;
  } catch (err) {
    return err;
  }
};
//token and user data
// token->cookie
//user -> store
