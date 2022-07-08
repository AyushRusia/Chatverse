export interface person {
  _id: string;
  name: string;
  email: string;
  profile: string;
}

export interface invitation {
  _id: string;

  senderName: string;
  senderEmail: string;
  senderProfile: string;

  recieverName: string;
  recieverEmail: string;
  recieverProfile: string;
}

export interface friend {
  _id: string;

  friendId: string;
  friendName: string;
  friendEmail: string;
  friendProfile: string;
}

export interface chat {
  message: string;
  time: Date;
  senderId: string;
}
