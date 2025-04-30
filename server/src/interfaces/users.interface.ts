import { Request } from 'express';

type IUser = {
  username: string;
  email: string;
  password: string;
  role?: string;
  resetToken: string;
  tokenExpire: Date | null;
};

type ILoginInfo = {
  email: string;
  password: string;
};

type DecodedToken = {
  id: string;
  iat: number;
  exp: number;
};

type CustomRequest = Request & {
  user: unknown;
};
type MonthlyUserStats = {
  month: number;
  year: number;
  count: number;
};

export type {
  IUser,
  ILoginInfo,
  CustomRequest,
  DecodedToken,
  MonthlyUserStats,
};
