import { PrismaClient } from '@prisma/client';

// TODO: Export the client
export const prisma = new PrismaClient();
//type;
export interface Context {
  prisma: PrismaClient;
}
export const context: Context = {
  prisma,
};
