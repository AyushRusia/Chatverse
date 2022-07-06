import Cloudinary from './cloudinary';

export interface chat {
  message: string;
  time: Date;
  senderId: string;
}
export async function myroomChat(room: string): Promise<chat[]> {
  return [{ message: 'Test Message', time: new Date(), senderId: 'My id' }];
}

export async function saveChat() {}
