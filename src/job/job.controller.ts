import { Controller, Post, Get, Body, UseGuards, Param } from '@nestjs/common';
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

  @Get('/:userCode')
  async getByUserCode(@Param('userCode') userCode: string) {
    const job = await this.jobService.findJobByUserCode({ userCode: userCode });
    return new JobResponseDto(job);
  }
}
