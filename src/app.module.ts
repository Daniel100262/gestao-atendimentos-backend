import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';
import { ServicesModule } from './services/services.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ExpensesModule } from './expenses/expenses.module';
import { FinancesModule } from './finances/finances.module';
import { ExpenseTypesModule } from './expense-types/expense-types.module';
import { SeedService } from './seed/seed.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST') ?? 'db',
        port: parseInt(config.get('DB_PORT') ?? '5432', 10),
        username: "postgres",
        password: "postgres",
        database: config.get<string>('DB_NAME') ?? 'atendimentos',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AuthModule,
    UsersModule,
    PatientsModule,
    ServicesModule,
    AppointmentsModule,
    ExpensesModule,
    FinancesModule,
    ExpenseTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule {}
