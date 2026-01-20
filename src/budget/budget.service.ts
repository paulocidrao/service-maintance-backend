import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Budget } from './entities/budget.entity';
import { Repository } from 'typeorm';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private readonly budgetRepositoy: Repository<Budget>,
  ) {}

  private async findBudgetOrFail(budgetId: string) {
    const budget = await this.budgetRepositoy.findOne({
      where: {
        id: budgetId,
      },
    });
    if (!budget) {
      throw new NotFoundException('Orçamento não encontrado!');
    }
    return budget;
  }

  async updateBudgetStatus(dto: UpdateBudgetDto, id: string) {
    const budget = await this.findBudgetOrFail(id);

    if (budget.status !== 'pending') {
      throw new BadRequestException(
        'A decisão sobre o orçamento já foi tomado!',
      );
    }

    budget.status = dto.status ?? budget.status;
    return this.budgetRepositoy.save(budget);
  }
}
