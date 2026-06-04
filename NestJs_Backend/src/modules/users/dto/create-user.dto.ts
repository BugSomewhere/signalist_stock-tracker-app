
import { IsEmail, IsEmpty, IsMobilePhone, IsOptional, Length } from "class-validator";


export class CreateUserDto {
   @Length(3, 20)
   username: string;

   @IsEmail()
   email: string;

   @Length(6, 20)
   password: string;

   @IsOptional()
   @IsMobilePhone('vi-VN')
   phone: string;

   @Length(6, 100)
   @IsOptional()
   address: string;

   role: string;

   @IsEmpty()
   accountType: string;

   isActive: boolean;

   codeId: string;

   codeExpired: Date;
}
