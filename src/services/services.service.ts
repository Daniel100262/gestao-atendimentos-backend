import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceType } from './service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServiceType)
    private readonly serviceRepo: Repository<ServiceType>,
  ) {}

  async create(data: Partial<ServiceType>): Promise<ServiceType> {
    const servico = this.serviceRepo.create(data);
    return this.serviceRepo.save(servico);
  }

  async findAll(): Promise<ServiceType[]> {
    return this.serviceRepo.find();
  }

  async findById(id: string): Promise<ServiceType> {
    const servico = await this.serviceRepo.findOne({ where: { id } });
    if (!servico) throw new NotFoundException('Serviço não encontrado');
    return servico;
  }

  async update(id: string, data: Partial<ServiceType>): Promise<ServiceType> {
    const servico = await this.findById(id);
    Object.assign(servico, data);
    return this.serviceRepo.save(servico);
  }
}
