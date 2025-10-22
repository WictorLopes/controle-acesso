import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  // Mock do UsersService
  const mockUsersService = {
    findAll: jest.fn().mockResolvedValue([
      {
        id: 1,
        nome: 'Admin',
        email: 'admin@example.com',
        perfil: 'admin',
        senha: 'hashed',
      },
    ]),
    create: jest.fn().mockResolvedValue({
      id: 2,
      nome: 'User Test',
      email: 'user@example.com',
      perfil: 'user',
      senha: 'hashed',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
