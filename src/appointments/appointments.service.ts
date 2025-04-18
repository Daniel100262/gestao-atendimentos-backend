import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Appointment } from './appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
  ) {}

  async create(data: Partial<Appointment>): Promise<Appointment> {
    const agendamento = this.appointmentRepo.create(data);
    return this.appointmentRepo.save(agendamento);
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepo.find();
  }

  async findById(id: string): Promise<Appointment> {
    const agendamento = await this.appointmentRepo.findOne({ where: { id } });
    if (!agendamento) throw new NotFoundException('Agendamento não encontrado');
    return agendamento;
  }

  async update(id: string, data: Partial<Appointment>): Promise<Appointment> {
    const agendamento = await this.findById(id);
    Object.assign(agendamento, data);
    return this.appointmentRepo.save(agendamento);
  }

  async findByDateRange(start: Date, end: Date): Promise<Appointment[]> {
    return this.appointmentRepo.find({
      where: {
        dataHora: Between(start, end),
      },
    });
  }
}
