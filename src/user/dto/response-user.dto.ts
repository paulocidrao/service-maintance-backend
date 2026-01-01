import { User } from '../entities/user.entity';

export class UserResponseDto {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly createdAt: Date;
  readonly updateAt: Date;
  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.createdAt = user.createdAt;
    this.updateAt = user.updatedAt;
  }
}
