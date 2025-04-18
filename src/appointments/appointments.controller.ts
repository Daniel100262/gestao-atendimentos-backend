import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './appointment.entity';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async create(@Body() data: Partial<Appointment>): Promise<Appointment> {
    return this.appointmentsService.create(data);
  }

  @Get()
  async findAll(): Promise<Appointment[]> {
    return this.appointmentsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Appointment> {
    return this.appointmentsService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Appointment>,
  ): Promise<Appointment> {
    return this.appointmentsService.update(id, data);
  }

  @Get('/agenda/periodo')
  async findByDateRange(
    @Query('inicio') inicio: string,
    @Query('fim') fim: string,
  ): Promise<Appointment[]> {
    return this.appointmentsService.findByDateRange(
      new Date(inicio),
      new Date(fim),
    );
  }
}
