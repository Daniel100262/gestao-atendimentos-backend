import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  whatsapp: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column()
  rua: string;

  @Column()
  numero: string;

  @Column()
  bairro: string;

  @Column()
  cidade: string;

  @Column()
  cep: string;

  @Column({ type: 'text', nullable: true })
  observacoes: string;

  @CreateDateColumn()
  dataCadastro: Date;
}
