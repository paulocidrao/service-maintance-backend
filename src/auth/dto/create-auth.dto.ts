import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsEmail({}, { message: 'Dados inválidos' })
  email: string;

  @IsString({ message: 'A senha deve se r uma string' })
  @IsNotEmpty({ message: 'A senha não pode ser vazia' })
  password: string;
}
