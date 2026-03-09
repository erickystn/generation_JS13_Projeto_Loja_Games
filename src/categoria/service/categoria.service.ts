import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from '../entity/categoria.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async findById(id: number): Promise<Categoria> {
    const resultado = await this.categoriaRepository.findOne({ where: { id } });

    if (resultado == null) {
      throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND);
    }

    return resultado;
  }
  findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find({ relations: { produtos: true } });
  }
  create(categoria: Categoria): Promise<Categoria> {
    return this.categoriaRepository.save(categoria);
  }

  async update(categoria: Categoria): Promise<Categoria> {
    await this.findById(categoria.id);
    return this.categoriaRepository.save(categoria);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return this.categoriaRepository.delete(id);
  }
}
