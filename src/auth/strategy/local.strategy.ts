import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'senha' });
  }

  async validate(email: string, senha: string): Promise<any> {
    const validaUsuario = await this.authService.validateUser(email, senha);

    console.log(validaUsuario);
    if (!validaUsuario) {
      throw new UnauthorizedException('Usuário e/ou senha incorreto(s)');
    }
    return validaUsuario;
  }
}
