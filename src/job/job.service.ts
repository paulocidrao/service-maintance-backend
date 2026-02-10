import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Job } from './entities/job.entity';
import { DataSource, Repository } from 'typeorm';
import { MailService } from '../sendMail/mail.service';
import { Budget } from 'src/budget/entities/budget.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { generateRandomCode } from 'src/utils/randomcode';
import { UpdateJobDto } from './dto/update-job.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    private readonly dataSource: DataSource,
    private readonly mailService: MailService,
    private readonly userService: UserService,
  ) {}
  async create(userData: Partial<User>, dto: CreateJobDto, workerName: string) {
    const user = await this.userService.findOne(userData);
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
        isFinished: false,
        workerName: workerName,
        ownerId: user.id,
        userCode: generateRandomCode(),
        budget: saveBudget,
      });
      return await manager.save(service);
    });
    await this.mailService.sendMail(
      user.email,
      created.userEmail,
      created.userCode,
    );

    return created;
  }

  private async findOneJobFail(jobData: Partial<Job>) {
    const job = await this.findOneJob(jobData);

    if (!job) {
      throw new NotFoundException('Serviço não encontrado!');
    }
    return job;
  }

  private async findOneJob(jobData: Partial<Job>) {
    const job = await this.jobRepository.findOne({
      where: {
        ...jobData,
      },
      relations: ['budget'],
    });
    return job;
  }

  async findJobById(jobData: Partial<Job>) {
    const job = await this.findOneJobFail(jobData);
    await this.jobRepository.findOne({
      where: {
        ...jobData,
      },
      relations: ['budget'],
    });
    return job;
  }

  async findJobByUserCode(jodData: Partial<Job>) {
    const job = await this.findOneJobFail(jodData);

    await this.jobRepository.findOne({
      where: {
        ...jodData,
      },
      relations: ['budget'],
    });
    return job;
  }
  async findAllJobs(ownerId: string) {
    const jobs = await this.jobRepository.find({
      where: {
        ownerId,
      },
      order: {
        createdAt: 'DESC',
      },
      relations: ['owner', 'budget'],
    });
    return jobs;
  }
  async finishJob(id: string, dto: UpdateJobDto) {
    const job = await this.findOneJobFail({ id: id });
    job.isFinished = dto.isFinished ?? job.isFinished;
    return this.jobRepository.save(job);
  }
  async updateJob(id: string, dto: UpdateJobDto) {
    const job = await this.findOneJobFail({ id: id });
    if (job.isFinished) {
      throw new BadRequestException('O serviço já foi finalizado!');
    }
    job.description = dto.description ?? job.description;
    job.deliveryDate = dto.deliveryDate ?? job.deliveryDate;
    return this.jobRepository.save(job);
  }
}
