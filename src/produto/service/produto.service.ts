import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Produto } from '../entity/produto.entity';
import { DeleteResult, LessThan, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto) private produtoRepository: Repository<Produto>,
  ) {}

  async findById(id: number): Promise<Produto> {
    const resultado = await this.produtoRepository.findOne({
      where: { id },
      relations: { categoria: true },
    });
    if (resultado == null) {
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
    }
    return resultado;
  }

  async findAll(): Promise<Produto[]> {
    return this.produtoRepository.find({ relations: { categoria: true } });
  }

  async create(produto: Produto): Promise<Produto> {
    return this.produtoRepository.save(produto);
  }

  async update(produto: Produto): Promise<Produto> {
    await this.findById(produto.id);
    return this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return this.produtoRepository.delete(id);
  }

  async findPrecoMoreThan(value: number):Promise<Produto[]> {
    const resultado = await this.produtoRepository.find({
      where: { preco: MoreThan(value) },
      relations: { categoria: true },
      order:{preco:'ASC'}
    });
    return resultado;
  }
  async findPrecoLessThan(value: number): Promise<Produto[]> {
    const resultado = await this.produtoRepository.find({
      where: { preco: LessThan(value) },
      relations: { categoria: true },
      order:{preco:'DESC'}
    });
    return resultado;
  }
}
