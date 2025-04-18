import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    if (!userData.senha) {
      throw new Error('Senha obrigatória');
    }

    const hashedPassword = await bcrypt.hash(userData.senha, 10);
    const user = this.userRepository.create({
      ...userData,
      senha: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async updateProfile(id: string, updateData: Partial<User>): Promise<User> {
    const user = await this.findById(id);

    if (updateData.senha) {
      updateData.senha = await bcrypt.hash(updateData.senha, 10);
    }

    Object.assign(user, updateData);
    return this.userRepository.save(user);
  }

  async updatePassword(userId: string, novaSenha: string): Promise<void> {
    const user = await this.findById(userId);
    user.senha = await bcrypt.hash(novaSenha, 10);
    await this.userRepository.save(user);
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
