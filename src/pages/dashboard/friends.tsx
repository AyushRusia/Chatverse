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
import Friends from '../../components/friends';
import { viewerQuery } from '../../react-query/queries/viewerQuery';
import styles from '../../styles/Home.module.css';
import { friend } from '../../types';

const Dashoboard: NextPage = () => {
  // query chalai {data, loading ,error} = viewerQuery(

  const { data, isLoading, error } = useQuery('user', viewerQuery);
  const [currentFriend, setFriend] = React.useState<friend>();
  const handleFriend = (friend: friend) => {
    setFriend(friend);
  };
  if (isLoading) return <h1>Loading</h1>;
  return (
    <>
      <Grid className='root'>
        <MyAppBar />
        <Grid container component='main'>
          <Grid item xs={0} md={4} component='main'>
            <h1 style={{ textAlign: 'center' }}>My Friends</h1>
            <Friends setFriend={handleFriend} />
          </Grid>
          <Grid item xs={12} md={8}>
            <h1>{currentFriend?.friendId}</h1>
            <h1>{currentFriend?.friendName}</h1>
            <h1>{currentFriend?.friendEmail}</h1>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashoboard;
