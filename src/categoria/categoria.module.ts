import { Module } from "@nestjs/common";
import { CategoriaController } from "./controller/categoria.controller";
import { CategoriaService } from "./service/categoria.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categoria } from "./entity/categoria.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Categoria])],
    exports:[CategoriaService],
    controllers:[CategoriaController],
    providers:[CategoriaService]
})
export class CategoriaModule{}