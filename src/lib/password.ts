import 'server-only';

import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: string,
  keyLength: number,
) => Promise<Buffer>;

const KEY_LENGTH = 64;

export const UNKNOWN_USER_PASSWORD_HASH = `${'0'.repeat(32)}:${'0'.repeat(KEY_LENGTH * 2)}`;

const deriveKey = (password: string, salt: string) =>
  scryptAsync(password.normalize('NFC'), salt, KEY_LENGTH);

export const hashPassword = async (password: string) => {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = await deriveKey(password, salt);

  return `${salt}:${derivedKey.toString('hex')}`;
};

export const verifyPassword = async (password: string, passwordHash: string) => {
  const [salt = '', storedKeyHex = ''] = passwordHash.split(':');
  const derivedKey = await deriveKey(password, salt);
  const storedKey = Buffer.from(storedKeyHex, 'hex');

  return storedKey.length === derivedKey.length && timingSafeEqual(derivedKey, storedKey);
};
