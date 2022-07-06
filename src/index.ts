import http from 'http';
import express from 'express';

//creating server

const app = express();

const server = http.createServer(app);
//Database
import { AppDataSource } from './sql/connection';

//Socket
import { Server } from 'socket.io';
import Authrouter from './controllers/auth';
import Apirouter from './controllers/invitation';
import cors from 'cors';
import dotenv from 'dotenv';
import authorize from './middleware/auth';
import { chat, myroomChat, saveChat } from './utils';
dotenv.config();

app.use(cors());
app.use(express.json());
app.use('/auth', Authrouter);
app.use('/api', authorize, Apirouter);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

io.on('connection', (socket) => {
  socket.onAny((event, ...args) => {
    console.log(socket.id, event, args);
  });

  socket.on('join-room', async (previous: string, room: string) => {
    await socket.leave(previous);
    await socket.join(room);

    const chats = await myroomChat(room);
    socket.emit('room-chat', chats);
  });

  socket.on('send-message', async (room: string, chat: chat) => {
    // await saveChat({ room,chat);
    const chats = await myroomChat(room);

    socket.broadcast.to(room).emit('recieve-message', chat);
  });

  socket.on('disconnet', () => {
    console.log('user disconnected');
  });
});
AppDataSource.initialize()
  .then(() => {
    server.listen(8080, () => {
      console.log('Listning to port 8080');
    });
  })
  .catch((e: any) => {
    console.log(e);
    console.log('Error Something went wrong');
  });
