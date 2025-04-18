import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() authCredentialsDto: AuthCredentialsDto) {
    const { email, password } = authCredentialsDto;
    const user = await this.usersService.findByEmail(email);

    if (!user || !(await this.authService.validateUser(email, password))) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }

    return this.authService.login(user);
  }

  @Post('trocar-senha')
  async trocarSenha(@Body() body: { email: string; novaSenha: string }) {
    const user = await this.usersService.findByEmail(body.email);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    user.senha = await bcrypt.hash(body.novaSenha, 10);
    user.precisaTrocarSenha = false;
    await this.usersService.save(user);

    return { message: 'Senha alterada com sucesso' };
  }
}
