import { Budget } from 'src/budget/entities/budget.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'job' })
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  isFinished: boolean;

  @Column()
  clientName: string;

  @Column()
  userEmail: string;

  @Column()
  deliveryDate: Date;

  @Column({ unique: true })
  userCode: string;

  @Column()
  workerName: string;

  @Column()
  description: string;

  @OneToOne(() => Budget, budget => budget.job)
  budget: Budget;

  @ManyToOne(() => User, user => user.jobs)
  owner: User;

  @Column()
  ownerId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
