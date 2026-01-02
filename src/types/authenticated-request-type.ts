import { User } from 'src/user/entities/user.entity';
import { Request } from 'express';
export interface AuthenticatedRequest extends Request {
  user: User;
}
