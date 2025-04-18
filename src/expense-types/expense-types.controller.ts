import { Controller, Post, Body, Get } from '@nestjs/common';
import { ExpenseTypesService } from './expense-types.service';
import { ExpenseType } from './expense-type.entity';

@Controller('expense-types')
export class ExpenseTypesController {
  constructor(private readonly service: ExpenseTypesService) {}

  @Post()
  create(@Body() data: Partial<ExpenseType>): Promise<ExpenseType> {
    return this.service.create(data);
  }

  @Get()
  findAll(): Promise<ExpenseType[]> {
    return this.service.findAll();
  }
}
