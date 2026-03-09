import { Module } from '@nestjs/common';
import { ProdutoController } from './controller/produto.controller';
import { ProdutoService } from './service/produto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entity/produto.entity';
import { CategoriaModule } from '../categoria/categoria.module';

@Module({ 
    imports: [TypeOrmModule.forFeature([Produto]),CategoriaModule], 
    exports: [], 
    controllers: [ProdutoController], 
    providers: [ProdutoService] 
})
export class ProdutoModule {}

