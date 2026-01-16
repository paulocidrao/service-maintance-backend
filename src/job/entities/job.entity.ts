import { Budget } from 'src/budget/entities/budget.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  clientName: string;

  @Column()
  userEmail: string;

  @Column()
  deliveryDate: Date;

  @Column({})
  userCode: string;

  @Column()
  description: string;

  @OneToOne(() => Budget, budget => budget.job)
  budget: Budget;
}
