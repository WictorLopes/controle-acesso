import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'admin@example.com',
  })
  email: string;
  @ApiProperty({ description: 'Senha do usuário', example: '12345' })
  senha: string;
}
