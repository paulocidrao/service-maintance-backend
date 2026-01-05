import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HashServer } from 'src/commom/Hash/hashService';
import { UserResponseDto } from './dto/response-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashService: HashServer,
  ) {}

  private async EmailExists(email: string) {
    const exist = await this.userRepository.existsBy({ email });
    if (exist) {
      throw new ConflictException('E-mail já cadastrado!');
    }
  }
  private async PhoneExists(phone: string) {
    const exist = await this.userRepository.existsBy({ phone });
    if (exist) {
      throw new ConflictException('Telefone já cadastrado!');
    }
  }
  async create(dto: CreateUserDto) {
    await this.EmailExists(dto.email);
    await this.PhoneExists(dto.phone);

    const hashedPassword = await this.hashService.hashPassword(dto.password);

    const newUser: CreateUserDto = {
      email: dto.email,
      name: dto.name,
      phone: dto.phone,
      document: dto.document,
      password: hashedPassword,
    };
    const created = await this.userRepository.save(newUser);
    return created;
  }
  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new ConflictException('Usuário não encontrado!');
    }
    return new UserResponseDto(user);
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new ConflictException('Usuário não encontrado!');
    }
    return user;
  }
}
