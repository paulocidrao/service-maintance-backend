import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from 'src/user/user.service';
import { HashServer } from 'src/commom/Hash/hashService';
import { JwtPayload } from 'src/types/jwt-payload';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hasService: HashServer,
    private readonly jwtService: JwtService,
  ) {}
  async login(dto: CreateAuthDto) {
    const user = await this.userService.findUserByEmail(dto.email);
    const error = new UnauthorizedException('Dados Inválidos');
    if (!user) {
      throw error;
    }
    const passwordIsValid = await this.hasService.compare(
      dto.password,
      user.password,
    );
    if (!passwordIsValid) {
      throw error;
    }
    const jwtPayload: JwtPayload = {
      email: user.email,
      sub: user.id,
    };
    const token = await this.jwtService.signAsync(jwtPayload);
    return { token };
  }
}
