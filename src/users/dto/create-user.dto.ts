import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome do usuário', example: 'Admin Teste' })
  nome: string;
  @ApiProperty({
    description: 'Email do usuário',
    example: 'admin@example.com',
  })
  email: string;
  @ApiProperty({ description: 'Senha do usuário', example: '12345' })
  senha: string;
  @ApiProperty({
    description: 'Perfil do usuário',
    example: 'admin',
    enum: ['admin', 'user'],
  })
  perfil?: 'admin' | 'user';
}
