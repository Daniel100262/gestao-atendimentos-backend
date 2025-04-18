import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { ServiceType } from './service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceType])],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
