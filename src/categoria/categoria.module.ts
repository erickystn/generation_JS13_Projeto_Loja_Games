import { Module } from "@nestjs/common";
import { CategoriaController } from "./controllers/categoria.controller";
import { CategoriaService } from "./services/categoria.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categoria } from "./entities/categoria.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Categoria])],
    exports:[CategoriaService],
    controllers:[CategoriaController],
    providers:[CategoriaService]
})
export class CategoriaModule{}