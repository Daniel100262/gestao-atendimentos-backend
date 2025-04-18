import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Roles } from '../roles.decorator';
import { RolesGuard } from '../roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getMe(@Request() req): Promise<User> {
    return this.usersService.findById(req.user.id);
  }

  @Patch('me')
  @Roles('admin', 'usuario')
  async updateMe(@Request() req, @Body() body: Partial<User>): Promise<User> {
    return this.usersService.updateProfile(req.user.id, body);
  }

  @Post()
  @Roles('admin')
  async create(@Body() body: Partial<User>): Promise<User> {
    return this.usersService.create(body);
  }

  @Get()
  @Roles('admin')
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'usuario')
  async findById(@Param('id') id: string, @Request() req): Promise<User> {
    if (req.user.role === 'usuario' && req.user.id !== id) {
      throw new ForbiddenException('Acesso negado');
    }
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @Roles('admin', 'usuario')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<User>,
    @Request() req,
  ): Promise<User> {
    if (req.user.role === 'usuario' && req.user.id !== id) {
      throw new ForbiddenException('Acesso negado');
    }
    return this.usersService.updateProfile(id, body);
  }
}
