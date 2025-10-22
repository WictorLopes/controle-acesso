import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(userData: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    const hashedPassword = await hash(userData.senha, 10);

    const user = this.usersRepository.create({
      nome: userData.nome,
      email: userData.email,
      senha: hashedPassword,
      perfil: userData.perfil,
    } as unknown as User);

    return this.usersRepository.save(user) as unknown as User;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return (
      (await this.usersRepository.findOne({ where: { email } })) ?? undefined
    );
  }
}
