import { nanoid } from 'nanoid';

export function generateRandomCode(): string {
  return nanoid(5);
}
