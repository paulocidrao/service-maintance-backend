import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
export class CreateJobDto {
  @IsNotEmpty({ message: 'o nome não pode ser vazio' })
  @IsString({ message: 'O nome precisa ser uma string' })
  clientName: string;

  @IsNotEmpty({ message: 'O email não pode ser vazio' })
  @IsEmail({}, { message: 'digite um email válido' })
  userEmail: string;

  @IsNotEmpty({ message: 'A data de entrega não pode ser vazia' })
  @IsOptional()
  userCode: string;

  @IsNotEmpty({ message: 'A data de entrega não pode ser vazia' })
  @Type(() => Date)
  @IsDate({ message: 'Data inválida' })
  deliveryDate: Date;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  price: number;

  @IsNotEmpty({ message: 'A descrição não pod e ser vazia' })
  @IsString({ message: 'A descrição precisa ser uma string' })
  description: string;
}
