import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useQuery } from 'react-query';
import { getFriendsQuery } from '../react-query/queries/getFriendsQuery';
import { friend } from '../types';
import socket from '../socket';
interface ListProp {
  currentFriend?: friend;
  setFriend: (friend: friend) => void;
}

export default function Friends(props: ListProp) {
  const { data, isLoading, error } = useQuery('friends', getFriendsQuery, {});
  const joinRoom = (previous: string, id: string) => {
    socket.emit('join-room', previous, id);
  };
  return (
    <>
      <Typography
        variant='h5'
        color='primary'
        sx={{ margin: '2px', textAlign: 'center' }}
      >
        My Friends
      </Typography>
      <List
        sx={{
          width: '100%',
          bgcolor: '#fff',
          borderRadius: '0,0,5px,5px',
          position: 'static',
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        {data &&
          data.map((friend, idx) => {
            return (
              <>
                <ListItem
                  key={friend._id}
                  sx={{ cursor: 'pointer' }}
                  alignItems='center'
                  onClick={() => {
                    const previous = props.currentFriend?._id;
                    props.setFriend(friend);
                    joinRoom(previous, friend._id);
                  }}
                >
                  <ListItemAvatar>
                    <Avatar alt='Remy Sharp' src={friend.friendProfile} />
                  </ListItemAvatar>
                  <ListItemText>
                    <Typography sx={{ color: 'black' }} component='h3'>
                      {friend.friendName}
                    </Typography>
                    <Typography sx={{ color: 'black' }} component='h5'>
                      {friend.friendEmail}
                    </Typography>
                  </ListItemText>
                </ListItem>
                <Divider variant='inset' component='li' />
              </>
            );
          })}
      </List>
    </>
  );
}
