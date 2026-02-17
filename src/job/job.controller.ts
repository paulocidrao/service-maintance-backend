import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Param,
  Req,
  Patch,
  Put,
  Query,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { JobResponseDto } from './dto/response-job.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from 'src/types/authenticated-request-type';
import { UpdateJobDto } from './dto/update-job.dto';
import { PaginationDTO } from 'src/pagination/pagination.dto';

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
      { id: req.user.id },
      createJobDto,
      req.user.name,
    );
    return new JobResponseDto(job);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async getAllJobs(
    @Req() req: AuthenticatedRequest,
    @Query() paginationDTO: PaginationDTO,
  ) {
    return await this.jobService.findAllJobs(req.user.id, paginationDTO);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/get/:id')
  async getJobById(@Param('id') id: string) {
    const job = await this.jobService.findJobById({ id });
    return new JobResponseDto(job);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/finished/:id')
  async finishedJob(@Param('id') id: string, @Body() dto: UpdateJobDto) {
    const job = await this.jobService.finishJob(id, dto);
    return new JobResponseDto(job);
  }
  @Get('/code/:userCode')
  async getByUserCode(@Param('userCode') userCode: string) {
    const job = await this.jobService.findJobByUserCode({ userCode: userCode });
    return new JobResponseDto(job);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update/:id')
  async updateJob(@Param('id') id: string, @Body() dto: UpdateJobDto) {
    const job = await this.jobService.updateJob(id, dto);
    return new JobResponseDto(job);
  }
}
