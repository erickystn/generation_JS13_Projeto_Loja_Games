import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { Usuario } from '../entities/usuario.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private bcrypt: Bcrypt
  ) {}

  async findById(id: number): Promise<Usuario> {
    const resultado = await this.usuarioRepository.findOne({ where: { id } });
    if (!resultado) {
      throw new HttpException('O usuário não existe', HttpStatus.NOT_FOUND);
    }
    return resultado;
  }
  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }
  async findByUsername(username: string): Promise<Usuario> {
    const resultado = await this.usuarioRepository.findOne({
      where: { nomeUsuario: username },
    });
    if (!resultado) {
      throw new HttpException('O username não foi encontrado', HttpStatus.NOT_FOUND);
    }
    return resultado;
  }

  async findByEmail(email: string): Promise<Usuario> {
    const resultado = await this.usuarioRepository.findOne({
      where: { email },
    });
    if (!resultado) {
      throw new HttpException('O e-mail não foi encontrado', HttpStatus.NOT_FOUND);
    }
    return resultado;
  }
  async create(usuario: Usuario): Promise<Usuario> {
    const { id, ...novoUsuario } = usuario;
    await this.emailExists(novoUsuario.email);
    await this.usernameExists(novoUsuario.nomeUsuario);
    novoUsuario.senha = await this.bcrypt.criptografarSenha(novoUsuario.senha)
    return this.usuarioRepository.save(novoUsuario);
  }
  async update(usuario: Usuario): Promise<Usuario> {
    await this.findById(usuario.id);
    await this.emailExists(usuario.email);
    await this.usernameExists(usuario.nomeUsuario);
    usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
    return this.usuarioRepository.save(usuario);
  }
  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return this.usuarioRepository.delete(id);
  }

  async emailExists(email:string){
    const exist = await this.usuarioRepository.exists({where:{email}});
    if(exist){
      throw new HttpException('O e-mail já está cadastrado', HttpStatus.CONFLICT);
    }
    
  }

  async usernameExists(username:string){
    const exist = await this.usuarioRepository.exists({where:{nomeUsuario: username}});
    if(exist){
      throw new HttpException('O nome de usuario já está cadastrado', HttpStatus.CONFLICT);
    }
  }

}
