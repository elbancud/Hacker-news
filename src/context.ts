import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { decodeAuthHeader } from './utils';
// TODO: Export the client
export const prisma = new PrismaClient();
//type;
export interface Context {
  prisma: PrismaClient;
  userId?: number;
}
// TODO: export the userId token coming from the request header auth
// decodeAuthHeader()
export const context = ({ req }: { req: Request }): Context => {
  const token =
    req && req.headers.authorization
      ? decodeAuthHeader(req.headers.authorization)
      : null;
  return {
    prisma,
    userId: token?.userId,
  };
};
