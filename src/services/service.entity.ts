import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ServiceType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  descricao: string;

  @Column('decimal', { precision: 10, scale: 2 })
  valorPadrao: number;

  @Column('int')
  duracaoPadrao: number;
}
