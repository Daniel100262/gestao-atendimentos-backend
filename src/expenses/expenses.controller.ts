import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Expense } from './expense.entity';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  async create(@Body() data: Partial<Expense>): Promise<Expense> {
    return this.expensesService.create(data);
  }

  @Get()
  async findAll(): Promise<Expense[]> {
    return this.expensesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Expense> {
    return this.expensesService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Expense>,
  ): Promise<Expense> {
    return this.expensesService.update(id, data);
  }

  @Get('/periodo')
  async findByDateRange(
    @Query('inicio') inicio: string,
    @Query('fim') fim: string,
  ): Promise<Expense[]> {
    return this.expensesService.findByDateRange(
      new Date(inicio),
      new Date(fim),
    );
  }
}
