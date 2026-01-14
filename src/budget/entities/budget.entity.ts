import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Job } from 'src/job/entities/job.entity';

type IBudgetStatus = 'pending' | 'reject' | 'accept';

@Entity()
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'reject', 'accept'],
    default: 'pending',
  })
  status: IBudgetStatus;

  @Column({ nullable: true })
  price: number;

  @OneToOne(() => Job)
  @JoinColumn()
  job: Job;
}
