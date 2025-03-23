import { Request } from 'express';

export type CustomReq = Request & {
  query: {
    _page: string;
    _limit: string;
  }
};
