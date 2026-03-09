
import { DeleteResult } from 'typeorm';
import { Categoria } from '../entity/categoria.entity';
import { CategoriaService } from './../service/categoria.service';
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

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
    return this.categoriaService.findById(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body()categoria: Categoria): Promise<Categoria> {
   return this.categoriaService.create(categoria);

  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.update(categoria);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id',ParseIntPipe)id: number): Promise<DeleteResult> {
    return this.categoriaService.delete(id)
  }
}
