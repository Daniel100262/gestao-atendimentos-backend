import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(private readonly usersService: UsersService) {}

  async onApplicationBootstrap() {
    const adminEmail = 'admin@admin.com';
    const userEmail = 'usuario@usuario.com';

    const existingAdmin = await this.usersService.findByEmail(adminEmail);
    const existingUser = await this.usersService.findByEmail(userEmail);

    if (!existingAdmin) {
      await this.usersService.create({
        nome: 'Administrador',
        email: adminEmail,
        senha: 'admin123',
        cpf: '000.000.000-00',
        whatsapp: '(00) 00000-0000',
        rua: 'Rua Admin',
        numero: '1',
        bairro: 'Centro',
        cidade: 'Adminópolis',
        cep: '00000-000',
        role: 'admin',
      });
      console.log('✅ Usuário ADMIN criado');
    }

    if (!existingUser) {
      await this.usersService.create({
        nome: 'Usuário Comum',
        email: userEmail,
        senha: 'usuario123',
        cpf: '111.111.111-11',
        whatsapp: '(11) 11111-1111',
        rua: 'Rua Usuário',
        numero: '2',
        bairro: 'Bairro Usuário',
        cidade: 'Usuáriolandia',
        cep: '11111-111',
        role: 'usuario',
      });
      console.log('✅ Usuário COMUM criado');
    }
  }
}
