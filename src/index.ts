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
import { myroomChat, saveChat } from './chat';
import { Chat } from './models/chat';
import { inMemoryStore } from './store';
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

const store = new inMemoryStore();

io.on('connection', (socket) => {
  const id = socket.handshake.auth.id;
  store.setValue(id);
  

  io.emit('connect-user', id, store.getAllValue());
  socket.on('join-room', async (previous: string, room: string) => {
    await socket.leave(previous);
    await socket.join(room);

    const chats = await myroomChat(room);
    socket.emit('room-chat', chats);
  });

  socket.on('send-message', async (room: string, chat: Chat) => {
    await saveChat(room, chat);
    socket.broadcast.to(room).emit('recieve-message', chat);
  });

  socket.on('disconnect', () => {
    store.deleteValue(id);
    socket.broadcast.emit('disconnect-user', id, store.getAllValue());
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
