import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServiceType } from './service.entity';

@Controller('service-types')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  async create(@Body() data: Partial<ServiceType>): Promise<ServiceType> {
    return this.servicesService.create(data);
  }

  @Get()
  async findAll(): Promise<ServiceType[]> {
    return this.servicesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ServiceType> {
    return this.servicesService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<ServiceType>,
  ): Promise<ServiceType> {
    return this.servicesService.update(id, data);
  }
}
