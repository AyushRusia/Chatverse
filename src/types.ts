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
