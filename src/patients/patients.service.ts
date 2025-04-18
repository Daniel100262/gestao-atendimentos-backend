import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Patient } from './patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(data: Partial<Patient>): Promise<Patient> {
    const paciente = this.patientRepository.create(data);
    paciente.senha = await bcrypt.hash(paciente.senha, 10);
    return this.patientRepository.save(paciente);
  }

  async findById(id: string): Promise<Patient> {
    const patient = await this.patientRepository.findOne({ where: { id } });
    if (!patient) throw new NotFoundException('Paciente não encontrado');
    return patient;
  }

  async update(id: string, data: Partial<Patient>): Promise<Patient> {
    const patient = await this.findById(id);
    Object.assign(patient, data);
    return this.patientRepository.save(patient);
  }

  async findAll(): Promise<Patient[]> {
    return this.patientRepository.find();
  }
}
