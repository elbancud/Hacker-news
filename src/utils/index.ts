import * as jwt from 'jsonwebtoken';
export const APP_SECRET_KEY = 'bulagt0k$uMUk0k4n$';
export interface AuthTokenPayload {
  userId: number;
}
export function decodeAuthHeader(authHeader: string): AuthTokenPayload {
  const token = authHeader.replace('Bearer', '');
  if (!token) {
    throw new Error('No token found');
  }
  return jwt.verify(token, APP_SECRET_KEY) as AuthTokenPayload;
}
