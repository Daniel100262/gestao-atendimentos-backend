import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Expense } from './expense.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepo: Repository<Expense>,
  ) {}

  async create(data: Partial<Expense>): Promise<Expense> {
    const despesa = this.expenseRepo.create(data);
    return this.expenseRepo.save(despesa);
  }

  async findAll(): Promise<Expense[]> {
    return this.expenseRepo.find();
  }

  async findById(id: string): Promise<Expense> {
    const despesa = await this.expenseRepo.findOne({ where: { id } });
    if (!despesa) throw new NotFoundException('Despesa não encontrada');
    return despesa;
  }

  async update(id: string, data: Partial<Expense>): Promise<Expense> {
    const despesa = await this.findById(id);
    Object.assign(despesa, data);
    return this.expenseRepo.save(despesa);
  }

  async findByDateRange(inicio: Date, fim: Date): Promise<Expense[]> {
    return this.expenseRepo.find({
      where: {
        data: Between(inicio, fim),
      },
    });
  }
}
