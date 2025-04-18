import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Appointment } from '../appointments/appointment.entity';
import { Expense } from '../expenses/expense.entity';

@Injectable()
export class FinancesService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
    @InjectRepository(Expense)
    private readonly expenseRepo: Repository<Expense>,
  ) {}

  async getResumoFinanceiro(inicio: Date, fim: Date) {
    const receitas = await this.appointmentRepo.find({
      where: {
        dataHora: Between(inicio, fim),
        statusPagamento: 'pago',
      },
    });

    const despesas = await this.expenseRepo.find({
      where: {
        data: Between(inicio, fim),
      },
    });

    const totalReceitas = receitas.reduce(
      (soma, r) => soma + Number(r.valor),
      0,
    );
    const totalDespesas = despesas.reduce(
      (soma, d) => soma + Number(d.valor),
      0,
    );

    return {
      totalReceitas,
      totalDespesas,
      saldo: totalReceitas - totalDespesas,
      receitas,
      despesas,
    };
  }
}
