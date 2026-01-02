import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'o nome não pode ser vazio' })
  @IsString({ message: 'O nome precisa ser uma string' })
  name: string;

  @IsNotEmpty({ message: 'O email não pode ser vazio' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsNotEmpty({ message: 'O telefone não pode ser vazio' })
  @IsPhoneNumber('BR', { message: 'Numero inválido' })
  phone: string;

  @IsNotEmpty({ message: 'A senha não pode ser vazia' })
  @IsString({ message: 'Senha precisa ser uma string' })
  @MinLength(6, { message: 'A senha deve ser maior que 6 caracteres' })
  password: string;
}
