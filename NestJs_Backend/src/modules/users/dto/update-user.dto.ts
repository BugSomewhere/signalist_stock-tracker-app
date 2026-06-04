import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto{
   @IsMongoId({ message: 'Invalid user ID' })
   _id: string;
   @IsOptional()
   name: string;
   @IsOptional()
   @IsEmail()
   email: string;
   @IsOptional()
   password: string;
   @IsOptional()
   phone: string
}
