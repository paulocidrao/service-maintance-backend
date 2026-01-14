import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { CommonModule } from 'src/commom/common.module';
import { Budget } from 'src/budget/entities/budget.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job, Budget]), CommonModule],
  controllers: [JobController],
  providers: [JobService],
  exports: [JobService],
})
export class JobModule {}
