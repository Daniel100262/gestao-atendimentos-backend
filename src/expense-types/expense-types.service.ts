import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseType } from './expense-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExpenseTypesService {
  constructor(
    @InjectRepository(ExpenseType)
    private readonly repo: Repository<ExpenseType>,
  ) {}

  async create(data: Partial<ExpenseType>) {
    const tipo = this.repo.create(data);
    return this.repo.save(tipo);
  }

  findAll(): Promise<ExpenseType[]> {
    return this.repo.find();
  }
}
