import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { chat, friend } from '../types';

import styles from '../styles/chatbox.module.css';
import socket from '../socket';
interface props {
  id?: string;
  currentFriend?: friend;
}

const Chatbox: React.FC<props> = (props) => {
  const myId = props.id;
  const friend = props.currentFriend;
  const [message, setMessage] = React.useState<string>('');
  const [chats, setChats] = React.useState<chat[]>([]);

  const ref = React.useRef(null);

  React.useEffect(() => {
    ref?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);
  const handleChange = (e: any) => {
    setMessage(e.target.value);
  };

  socket.on('room-chat', (chats: chat[]) => {
    setChats(chats);
  });

  socket.on('recieve-message', (chat: chat) => {
    setChats([...chats, chat]);
  });
  const sendMessage = () => {
    const newChat: chat = {
      message: message,
      senderId: myId,
      time: new Date(),
    };
    setChats([...chats, newChat]);
    socket.emit('send-message', props.currentFriend?._id, newChat);
    setMessage('');
  };
  return (
    <>
      <Box component='div' className={styles.root}>
        <Box component='header' className={styles.header}>
          <Typography variant='h6'>{friend?.friendName}</Typography>
          <Typography variant='caption'>Online</Typography>
        </Box>

        <Box className={styles.chatarea}>
          {chats.map((chat) => {
            return (
              <>
                <div className={styles.sentMessage}>{chat.message}</div>
                <div className={styles.sentMessage}>{chat.message}</div>
                <div className={styles.recieveMessage}>{chat.message}</div>
              </>
            );
          })}
        </Box>

        <Box component='footer' className={styles.footer}>
          <TextField
            className={styles.field}
            value={message}
            onChange={handleChange}
            multiline
            sx={{ borderRadius: '5px' }}
          ></TextField>
          <Button
            className={styles.button}
            variant='contained'
            color='secondary'
            onClick={sendMessage}
          >
            Send
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Chatbox;
