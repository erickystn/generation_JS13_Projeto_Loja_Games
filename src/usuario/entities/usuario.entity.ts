import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsString, Length, Min } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsAdult } from '../decorators/is-adult.decorator';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty({message:"Username não pode ser vazio"})
  @Transform((param: TransformFnParams) => param.value.trim())
  @Column({ nullable: false, unique: true, type: 'varchar' })
  nomeUsuario: string;

  @IsString()
  @IsNotEmpty({message:" O nome não pode ser vazio"})
  @Transform((param: TransformFnParams) => param.value.trim())
  @Column({ nullable: false, type: 'varchar' })
  nome: string;

  @IsDate()
  @IsAdult()
  @Type(() => Date)
  @IsNotEmpty({message:"Data nascimento não pode ser vazia"})
  @Column({ nullable: false, type: 'date' })
  dataNascimento: Date;

  @Column({ nullable: false, unique: true, type: 'varchar' })
  @Transform((param: TransformFnParams) => param.value.trim())
  @IsNotEmpty({message:"E-mail não pode ser vazio"})
  @IsEmail()
  email: string;

  @Column({ nullable: false, type: 'varchar' ,length:255})
  @Transform((param: TransformFnParams) => param.value.trim())
  @IsNotEmpty({message:"Senha não pode ser vazia"})
  @Length(8,255,{message:"O tamanho precisa ser entre 8 a 255 caracteres"})
  senha: string;
}
