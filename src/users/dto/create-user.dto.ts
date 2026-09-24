import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  cpf: string
  
  @IsEmail()
  @IsNotEmpty()
  email:string;

  @IsString()
  @MaxLength(6)
  password: string;
}
