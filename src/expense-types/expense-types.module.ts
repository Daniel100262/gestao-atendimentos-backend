import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseTypesService } from './expense-types.service';
import { ExpenseTypesController } from './expense-types.controller';
import { ExpenseType } from './expense-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseType])],
  controllers: [ExpenseTypesController],
  providers: [ExpenseTypesService],
})
export class ExpenseTypesModule {}
