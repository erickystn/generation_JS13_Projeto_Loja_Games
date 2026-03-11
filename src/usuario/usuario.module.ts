import { forwardRef, Module } from "@nestjs/common";
import { UsuarioController } from "./controllers/usuario.controller";
import { UsuarioService } from "./service/usuario.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./entities/usuario.entity";
import { AuthModule } from "../auth/auth.module";


@Module({
    controllers:[UsuarioController],
    exports:[UsuarioService],
    imports:[TypeOrmModule.forFeature([Usuario]), forwardRef(()=>AuthModule)],
    providers:[UsuarioService]
})
export class UsuarioModule{

}