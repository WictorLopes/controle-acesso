import { Controller, Post, Body, Ip } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Realiza login e retorna JWT' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso.' })
  async login(
    @Body('email') email: string,
    @Body('senha') senha: string,
    @Ip() ip: string,
    // @Req() req: Request,
  ) {
    const user = await this.authService.validateUser(email, senha);
    const result = this.authService.login(user);

    console.log(`Login bem-sucedido de ${user.email} vindo do IP ${ip}`);

    return result;
  }
}
