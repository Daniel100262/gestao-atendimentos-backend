import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ExpenseType } from '../expense-types/expense-type.entity';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  descricao: string;

  @ManyToOne(() => ExpenseType, { eager: true })
  @JoinColumn()
  tipo: ExpenseType;

  @Column('decimal', { precision: 10, scale: 2 })
  valor: number;

  @Column('date')
  data: Date;

  @Column({ default: 'aberto' })
  statusPagamento: 'aberto' | 'pago';
}
