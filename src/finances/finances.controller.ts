import { Controller, Get, Query } from '@nestjs/common';
import { FinancesService } from './finances.service';

@Controller('financas')
export class FinancesController {
  constructor(private readonly financesService: FinancesService) {}

  @Get()
  async getResumo(@Query('inicio') inicio: string, @Query('fim') fim: string) {
    const dataInicio = new Date(inicio);
    const dataFim = new Date(fim);
    return this.financesService.getResumoFinanceiro(dataInicio, dataFim);
  }
}
