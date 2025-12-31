export abstract class HashServer {
  abstract hashPassword(password: string): Promise<string>;
  abstract compare(password: string, hash: string): Promise<boolean>;
}
