import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioService } from '../service/usuario.service';
import { DeleteResult } from 'typeorm';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('find/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuarioService.findById(id);
  }
  @Get("all/")
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }
  @Get('username/:username')
  @HttpCode(HttpStatus.OK)
  findByUsername(@Param('username') username: string): Promise<Usuario> {
    return this.usuarioService.findByUsername(username);
  }
  @Post("create")
  @HttpCode(HttpStatus.CREATED)
  create(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.create(usuario);
  }
  @Put("update")
  @HttpCode(HttpStatus.OK)
  update(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.update(usuario);
  }
  @Delete('delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() id: number): Promise<DeleteResult> {
    return this.usuarioService.delete(id);
  }
}
