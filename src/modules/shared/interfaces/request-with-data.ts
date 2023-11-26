import { Request as ExpressRequest } from 'express';

export interface IRequestWithData extends ExpressRequest{
  accessTokenData?: {
    sub?: string;
  };
  refreshTokenData?: {
    sub?: string;
    sessionId?: string;
  };
}
