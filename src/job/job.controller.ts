import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Param,
  Req,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { JobResponseDto } from './dto/response-job.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from 'src/types/authenticated-request-type';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() createJobDto: CreateJobDto,
  ) {
    const job = await this.jobService.create(
      req.user.id,
      createJobDto,
      req.user.name,
    );
    return new JobResponseDto(job);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async getAllJobs(@Req() req: AuthenticatedRequest) {
    const jobs = await this.jobService.findAllJobs(req.user.id);
    return jobs.map(job => new JobResponseDto(job));
  }

  @Get('/code/:userCode')
  async getByUserCode(@Param('userCode') userCode: string) {
    const job = await this.jobService.findJobByUserCode({ userCode: userCode });
    return new JobResponseDto(job);
  }
}
