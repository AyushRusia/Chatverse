import { Chat } from './models/chat';
import { AppDataSource } from './sql/connection';

const chatRepository = AppDataSource.getRepository(Chat);
export interface chat {
  message: string;
  time: Date;
  senderId: string;
}
export async function myroomChat(room: string): Promise<Chat[]> {
  try {
    const chats = await chatRepository.findBy({ room: room });
    await chats.sort((a, b) => {
      const d1 = new Date(a.time).getTime();
      const d2 = new Date(b.time).getTime();

      if (d1 > d2) return -1;
      return 1;
    });
    return chats;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function saveChat(room: string, chat: chat) {
  try {
    const newChat = await chatRepository.create({ room, ...chat });
    const res = await chatRepository.save(newChat);
  } catch (err) {
    console.log(err);
  }
}
