import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LogsService } from '../logs/logs.service';
import { hash } from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;
  let logsService: LogsService;

  const mockUsersService = {
    findByEmail: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(() => 'mocked-jwt-token'),
  };

  const mockLogsService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: LogsService, useValue: mockLogsService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    logsService = module.get<LogsService>(LogsService);
  });

  it('should validate a user with correct credentials', async () => {
    const password = await hash('12345', 10);
    mockUsersService.findByEmail.mockResolvedValue({
      id: 1,
      nome: 'Admin Teste',
      email: 'admin@example.com',
      senha: password,
      perfil: 'admin',
    });

    const result = await authService.validateUser('admin@example.com', '12345');
    expect(result.email).toBe('admin@example.com');
  });

  it('should return null for wrong password', async () => {
    const password = await hash('12345', 10);
    mockUsersService.findByEmail.mockResolvedValue({
      id: 1,
      nome: 'Admin Teste',
      email: 'admin@example.com',
      senha: password,
      perfil: 'admin',
    });

    const result = await authService.validateUser(
      'admin@example.com',
      'wrongpass',
    );
    expect(result).toBeNull();
  });

  it('should return JWT on login and create log', () => {
    const user: any = {
      id: 1,
      nome: 'Admin Teste',
      email: 'admin@example.com',
      senha: 'hashedpassword',
      perfil: 'admin',
    };
    const ip = '127.0.0.1';
    const token = authService.login(user);

    expect(token).toHaveProperty('access_token', 'mocked-jwt-token');
    expect(mockLogsService.create).toHaveBeenCalledWith({ userId: 1, ip });
  });
});
