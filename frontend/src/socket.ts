import { io } from 'socket.io-client';
const URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const socket = io(URL, { autoConnect: false });

export default socket;

export function joinRoom(room: string) {
  socket.emit('join-room', room);
}
