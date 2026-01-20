import { PartialType } from '@nestjs/mapped-types';
import { CreateBudgetDTO } from './create-budget.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';

export enum EBudgetStatus {
  PENDING = 'pending',
  REJECT = 'reject',
  ACCEPT = 'accept',
}

export class UpdateBudgetDto extends PartialType(CreateBudgetDTO) {
  @IsNotEmpty({ message: 'O status não pode ser vazio' })
  @IsEnum(EBudgetStatus, {
    message: 'O status deve ser: pendente,aceito ou rejeitado',
  })
  status: EBudgetStatus;
}
