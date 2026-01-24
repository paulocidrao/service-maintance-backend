import { Job } from '../entities/job.entity';

export class JobResponseDto {
  readonly id: string;
  readonly clientName: string;
  readonly userCode: string;
  readonly description: string;
  readonly deliveryDate: Date;
  readonly isFinished: boolean;
  readonly workerName: string;
  readonly ownerId: string;
  readonly budget: {
    id: string;
    status: string;
    price: number;
  };
  constructor(job: Job) {
    this.id = job.id;
    this.clientName = job.clientName;
    this.userCode = job.userCode;
    this.description = job.description;
    this.deliveryDate = job.deliveryDate;
    this.isFinished = job.isFinished;
    this.workerName = job.workerName;
    this.ownerId = job.ownerId;
    this.budget = {
      id: job.budget.id,
      status: job.budget.status,
      price: job.budget.price / 100,
    };
  }
}
