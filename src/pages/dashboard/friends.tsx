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
import Chatbox from '../../components/chatbox';
import MyAppBar from '../../components/Dashboard/Appbar';
import ReceivedInvitation from '../../components/Dashboard/Invitations/recieveinvitation';
import SentInvitation from '../../components/Dashboard/Invitations/sendinvitation';
import Friends from '../../components/friends';
import { viewerQuery } from '../../react-query/queries/viewerQuery';
import socket from '../../socket';
import styles from '../../styles/Home.module.css';
import { friend } from '../../types';

const Dashoboard: NextPage = () => {
  // query chalai {data, loading ,error} = viewerQuery(

  const { data, isLoading, error } = useQuery('user', viewerQuery, {
    onSuccess: (data) => {
      socket.auth = { id: data._id };
      socket.connect();
    },
  });

  socket.onAny((event, ...args) => {});
  const [currentFriend, setFriend] = React.useState<friend>();
  const [onlineUsers, setOnlineUsers] = React.useState<string[]>([]);
  const [status, setStatus] = React.useState('Offline');
  const handleFriend = (friend: friend) => {
    setFriend(friend);

    if (onlineUsers.includes(friend?.friendId)) {
      setStatus('Online');
    } else setStatus('Offline');
  };
  socket.on('connect-user', (val1, val2: string[]) => {
    if (val1 == currentFriend?.friendId) setStatus('Online');
    setOnlineUsers(val2);
  });
  socket.on('disconnect-user', (val1, val2) => {
    if (val1 == currentFriend?.friendId) setStatus('Offline');
    setOnlineUsers(val2);
  });
  if (isLoading) return <h1>Loading</h1>;
  return (
    <>
      <Grid container className={styles.root}>
        <Grid item xs={12} sx={{ height: 'max-content' }}>
          <MyAppBar page='friend' />
        </Grid>
        <Grid
          item
          xs={0}
          md={4}
          sx={{ height: '89.5vh', display: { xs: 'none', md: 'block' } }}
        >
          <Friends currentFriend={currentFriend} setFriend={handleFriend} />
        </Grid>
        <Grid item xs={12} md={8} sx={{ height: '89.5vh' }}>
          {currentFriend ? (
            <Chatbox
              currentFriend={currentFriend}
              id={data._id}
              currentStatus={status}
            />
          ) : (
            <h4>Welcome To Chatverse , Enjoy Chatting!!</h4>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Dashoboard;
