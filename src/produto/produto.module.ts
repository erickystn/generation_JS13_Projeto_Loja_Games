import { Module } from '@nestjs/common';
import { ProdutoController } from './controller/produto.controller';
import { ProdutoService } from './service/produto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entity/produto.entity';

@Module({ 
    imports: [TypeOrmModule.forFeature([Produto])], 
    exports: [], 
    controllers: [ProdutoController], 
    providers: [ProdutoService] 
})
export class ProdutoModule {}

