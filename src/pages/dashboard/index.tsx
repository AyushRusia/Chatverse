import {
  Grid,
  Paper,
  Tabs,
  Tab,
  Divider,
  Box,
  Typography,
  Button,
  Avatar,
} from '@mui/material';
import { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import MyAppBar from '../../components/Dashboard/Appbar';
import ReceivedInvitation from '../../components/Dashboard/Invitations/recieveinvitation';
import SentInvitation from '../../components/Dashboard/Invitations/sendinvitation';
import { viewerQuery } from '../../react-query/queries/viewerQuery';
import styles from '../../styles/Home.module.css';

const Dashoboard: NextPage = () => {
  // query chalai {data, loading ,error} = viewerQuery(

  const { data, isLoading, error } = useQuery('user', viewerQuery);

  console.log('dashboard', data);

  const [tab, setTab] = React.useState<Number>(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  if (isLoading) return <h1>Loading</h1>;
  return (
    <>
      <Grid className='root'>
        <MyAppBar />
        <Grid container component='main'>
          <Grid item xs={12} md={7}>
            <Box
              component='div'
              className={styles.root}
              sx={{ justifyContent: 'space-around' }}
            >
              <Box className={styles.main}>
                <img src='/vercel.svg' />
                <Typography component='h3'>Hello , {data?.name}</Typography>
              </Box>
              <Box className={styles.main}>
                <Typography component='h5'>
                  {' '}
                  Welcome to Chatverse , Enjoy Chatting with your friends
                </Typography>
                <Button color='secondary'>Go to Friends</Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper elevation={6} sx={{ height: '' }}>
              <Tabs
                value={tab}
                onChange={handleChange}
                textColor='inherit'
                indicatorColor='primary'
                variant='fullWidth'
                sx={{ overflow: 'auto' }}
              >
                <Tab label='Sent Invitations' />
                <Tab label='Received Invitations' />
              </Tabs>
              <Divider />
              {tab === 0 ? <SentInvitation /> : <ReceivedInvitation />}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashoboard;
