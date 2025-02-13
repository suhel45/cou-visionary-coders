import { Request } from "express";

type IUser = {
  username: string;
  phoneNumber: string;
  email: string;
  password: string;
};

type ILoginInfo = {
  email: string;
  password: string;
};

type CustomRequest = Request & {
  user: unknown;
}

export type { IUser, ILoginInfo, CustomRequest };
