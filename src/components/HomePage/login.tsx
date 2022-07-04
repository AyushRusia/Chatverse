import * as React from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';

import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { loginMuattion } from '../../react-query/mutations/loginMutation';
import cookies from 'js-cookie';

export default function Login() {
  const router = useRouter();
  const mutatation = useMutation(loginMuattion, {
    onSuccess: (data) => {
      //cookie mein token save karana
      cookies.set('token', data.token);
      router.push('/dashboard');
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    const password = data.get('password');

    // const response = await axios.post(
    //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
    //   { email, password }
    // );

    // console.log(response);
    mutatation.mutate({ email, password });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
