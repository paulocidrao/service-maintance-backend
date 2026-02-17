import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Min, Max } from 'class-validator';

export class PaginationDTO {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Max(100)
  @Type(() => Number)
  perPage?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  page?: number;
}
