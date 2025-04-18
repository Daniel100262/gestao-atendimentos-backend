import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { Patient } from './patient.entity';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  async create(@Body() data: Partial<Patient>): Promise<Patient> {
    return this.patientsService.create(data);
  }

  @Get()
  async findAll(): Promise<Patient[]> {
    return this.patientsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Patient> {
    return this.patientsService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Patient>,
  ): Promise<Patient> {
    return this.patientsService.update(id, data);
  }
}
