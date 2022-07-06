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
import { useRouter } from 'next/router';

import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import MyAppBar from '../../components/Dashboard/Appbar';
import ReceivedInvitation from '../../components/Dashboard/Invitations/recieveinvitation';
import SentInvitation from '../../components/Dashboard/Invitations/sendinvitation';
import { viewerQuery } from '../../react-query/queries/viewerQuery';
import styles from '../../styles/dashboard.module.css';

const Dashoboard: NextPage = () => {
  // query chalai {data, loading ,error} = viewerQuery(

  const { data, isLoading, error, isError } = useQuery('user', viewerQuery);

  const router = useRouter();
  const [tab, setTab] = React.useState<Number>(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  if (isLoading) return <h1>Loading</h1>;
  return (
    <>
      <Grid container className={styles.root}>
        <Grid item xs={12}>
          <MyAppBar page='dashboard' />
        </Grid>
        <Grid item xs={12} md={7}>
          <Box component='div' className={styles.container}>
            <Box className={styles.main}>
              <img alt='Profile' src={data?.profile} className={styles.img} />
              <Typography component='h3'>Hello , {data?.name}</Typography>
            </Box>
            <Box className={styles.main}>
              <Typography component='h5'>
                {' '}
                Welcome to Chatverse , Enjoy Chatting with your friends
              </Typography>
              <Button
                color='secondary'
                variant='outlined'
                onClick={() => {
                  router.push('/dashboard/friends');
                }}
              >
                Go to Friends
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper elevation={6} sx={{ height: '100%' }}>
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
    </>
  );
};

export default Dashoboard;
