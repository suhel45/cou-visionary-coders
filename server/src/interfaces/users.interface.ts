 type IUser = {
  username: string;
  contact: string;
  email: string;
  password: string;
};


type ILoginInfo = {
  email: string;
  password: string;
}

export type { IUser, ILoginInfo };