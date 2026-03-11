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
  UseGuards,
} from '@nestjs/common';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioService } from '../service/usuario.service';
// import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @UseGuards(JwtAuthGuard)
  @Get('find/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuarioService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("all/")
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }
  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Put("update")
  @HttpCode(HttpStatus.OK)
  update(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.update(usuario);
  }
  // @UseGuards(JwtAuthGuard)
  // @Delete('delete/:id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // delete(@Param() id: number): Promise<DeleteResult> {
  //   return this.usuarioService.delete(id);
  // }
}
