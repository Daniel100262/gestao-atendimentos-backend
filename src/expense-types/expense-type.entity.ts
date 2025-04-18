import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ExpenseType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  descricao: string;

  @Column()
  frequencia: 'aleatoria' | 'diaria' | 'mensal' | 'anual';
}
