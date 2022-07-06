import * as React from 'react';
import styles from './style.module.css';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';

import Container from '@mui/material/Container';
import { Grid, Input } from '@mui/material';

import axios from 'axios';
import { Console } from 'console';

export default function Register() {
  const [preview, setPreview] = React.useState<string>();
  const [image64, setImage64] = React.useState<any>();
  const handleImage = (event: any) => {
    const file = event.target.files[0];
    console.log(file);

    if (file.size > 1024 * 100) return alert('File Size greater than 100 KB');
    let reader = new FileReader();

    reader.readAsDataURL(file);
    setPreview(URL.createObjectURL(file));
    reader.onload = function () {
      console.log(reader.result);
      setImage64(reader.result?.toString());
    };

    reader.onerror = function () {
      console.log(reader.error?.message);
    };
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const reqData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      profile: image64,
    };
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      {
        ...reqData,
      }
    );

    console.log(response);
  };

  return (
    <Container component='main'>
      <CssBaseline />
      <Box>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container>
            <Grid item xs={12} md={5} className={styles.col}>
              <TextField
                margin='normal'
                required
                fullWidth
                id='name'
                label='Name'
                name='name'
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
              />
            </Grid>
            <Grid item xs={12} md={5} className={styles.col}>
              <img
                className={styles.img}
                src={preview ? preview : '/favicon.ico'}
              ></img>
              {/* <label htmlFor='preview'>
                Upload
                <input
                  accept='image/*'
                  id='preview'
                  name='preview'
                  hidden
                  type='file'
                  onChange={(e) => {
                    handleImage(e);
                  }}
                />
                <Button id='preview'>Upload</Button>
              </label> */}
              <label htmlFor='preview'>
                <input
                  id='preview'
                  name='preview'
                  accept='image/*'
                  hidden
                  multiple
                  type='file'
                />
                <Button sx={{ margin: 'auto' }} component='span'>
                  Upload
                </Button>
              </label>
              <Button
                onClick={() => {
                  setPreview('');
                }}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
