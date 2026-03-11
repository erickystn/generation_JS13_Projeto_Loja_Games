import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsuarioService } from '../../usuario/service/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioLogin } from '../entities/usuarioLogin.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private jwtService: JwtService,
    private bcrypt: Bcrypt,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const buscaUsuario = await this.usuarioService.findByEmail(email);
console.log( "resultado ",buscaUsuario)
    if (!buscaUsuario)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

    const matchPassword = await this.bcrypt.compararSenhas(
      password,
      buscaUsuario.senha,
    );

    if (buscaUsuario && matchPassword) {
      const { senha, ...resposta } = buscaUsuario;
      return resposta;
    }

    return null;
  }

  async login(usuarioLogin: UsuarioLogin) {
    const payload = { sub: usuarioLogin.email };
    const buscaUsuario = await this.usuarioService.findByEmail(
      usuarioLogin.email,
    );

    if (!buscaUsuario)
      throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

    return {
      id: buscaUsuario.id,
      nome: buscaUsuario.nome,
      email: usuarioLogin.email,
      senha: '',
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }
}
