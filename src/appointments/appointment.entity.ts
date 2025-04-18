import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Patient } from '../patients/patient.entity';
import { ServiceType } from '../services/service.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Patient, { eager: true })
  @JoinColumn()
  paciente: Patient;

  @ManyToOne(() => ServiceType, { eager: true })
  @JoinColumn()
  tipoAtendimento: ServiceType;

  @Column('timestamp')
  dataHora: Date;

  @Column('int')
  duracao: number;

  @Column('decimal', { precision: 10, scale: 2 })
  valor: number;

  @Column({ default: 'aberto' })
  statusPagamento: 'aberto' | 'pago';

  @Column({ default: false })
  recorrente: boolean;

  @Column({ nullable: true })
  repeticoes: number;
}
