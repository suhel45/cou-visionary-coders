 type IUser = {
  username: string;
  phoneNumber: string;
  email: string;
  password: string;
};


type ILoginInfo = {
  email: string;
  password: string;
}

export type { IUser, ILoginInfo };