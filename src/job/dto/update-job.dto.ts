import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-job.dto';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateJobDto extends PartialType(CreateJobDto) {
  @IsNotEmpty({
    message: 'É preciso inserir um valor para finalizar o serviço',
  })
  @IsBoolean({ message: 'o valor precisar ser verdadeiro ou falso' })
  isFinished: boolean;
}
