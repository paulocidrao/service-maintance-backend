import { Controller, Param, Body, ParseUUIDPipe, Patch } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Patch('/:id')
  async updateBudgetStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateBudgetDto,
  ) {
    return await this.budgetService.updateBudgetStatus(dto, id);
  }
}
