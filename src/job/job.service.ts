import { Injectable } from '@nestjs/common';
import { Job } from './entities/job.entity';
import { DataSource, Repository } from 'typeorm';
import { Budget } from 'src/budget/entities/budget.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    private readonly dataSource: DataSource,
  ) {}
  async create(dto: CreateJobDto) {
    const newService: CreateJobDto = {
      clientName: dto.clientName,
      userEmail: dto.userEmail,
      deliveryDate: dto.deliveryDate,
      description: dto.description,
      price: dto.price * 100,
    };
    const created = await this.dataSource.transaction(async manager => {
      const budget = manager.create(Budget, {
        status: 'pending',
        price: newService.price,
      });
      const saveBudget = await manager.save(budget);
      const service = manager.create(Job, {
        ...newService,
        budget: saveBudget,
      });
      return await manager.save(service);
    });
    return created;
  }
}
