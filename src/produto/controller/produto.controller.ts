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
import { ProdutoService } from '../service/produto.service';
import { Produto } from '../entity/produto.entity';
import { DeleteResult } from 'typeorm';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.findById(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.create(produto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body()produto: Produto): Promise<Produto> {
    return this.produtoService.update(produto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.produtoService.delete(id);
  }

  @Get('preco-maior-que/:value')
  @HttpCode(HttpStatus.OK)
  findPrecoMoreThan(
    @Param('value', ParseIntPipe) value: number,
  ): Promise<Produto[]> {
    return this.produtoService.findPrecoMoreThan(value)
  }

  @Get('preco-menor-que/:value')
  @HttpCode(HttpStatus.OK)
  findPrecoLessThan(
    @Param('value', ParseIntPipe) value: number,
  ): Promise<Produto[]> {
    return this.produtoService.findPrecoLessThan(value)
  }
}
