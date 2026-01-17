import { Budget } from 'src/budget/entities/budget.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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
  description: string;

  @OneToOne(() => Budget, budget => budget.job)
  budget: Budget;
}
