import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { JobResponseDto } from './dto/response-job.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createJobDto: CreateJobDto) {
    const job = await this.jobService.create(createJobDto);
    return new JobResponseDto(job);
  }
}
