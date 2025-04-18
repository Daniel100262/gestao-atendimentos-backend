import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(senha, user.senha))) {
      const { senha, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      precisaTrocarSenha: user.precisaTrocarSenha,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  decodeToken(token: string): any {
    return this.jwtService.decode(token);
  }

  async getUserFromToken(token: string): Promise<User | null> {
    try {
      const payload = this.jwtService.decode(token) as { sub: string };
      if (!payload?.sub) return null;
      return await this.usersService.findById(payload.sub);
    } catch (error) {
      return null;
    }
  }
}
