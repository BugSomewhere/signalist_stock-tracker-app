import { IsEmail, IsNotEmpty, IsOptional, Length } from "class-validator";


export class CreateAuthDto {

   @IsOptional()
   username?: string;
   @IsNotEmpty( {message: 'Email should not be empty'} )
   @IsEmail()
   email: string;
   @IsNotEmpty( {message: 'Password should not be empty'} )
   @Length(6, 20)
   password: string;
}