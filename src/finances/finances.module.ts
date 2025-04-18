import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '../appointments/appointment.entity';
import { Expense } from '../expenses/expense.entity';
import { FinancesService } from './finances.service';
import { FinancesController } from './finances.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Expense])],
  controllers: [FinancesController],
  providers: [FinancesService],
})
export class FinancesModule {}
