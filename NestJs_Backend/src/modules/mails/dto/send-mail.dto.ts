import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendMailDto {
   @IsEmail()
   @IsNotEmpty()
   to: string;

   @IsString()
   @IsNotEmpty()
   subject: string;

   @IsString()
   @IsOptional()
   text?: string;

   @IsString()
   @IsOptional()
   template?: string;

   @IsOptional()
   context?: Record<string, any>;
}

export class SendRegisterMailDto {
   @IsEmail()
   @IsNotEmpty()
   to: string;

   @IsString()
   @IsNotEmpty()
   username: string;

   @IsString()
   @IsNotEmpty()
   activationCode: string;

   @IsString()
   @IsOptional()
   activationLink?: string;
}

export class SendResetPasswordMailDto {
   @IsEmail()
   @IsNotEmpty()
   to: string;

   @IsString()
   @IsNotEmpty()
   username: string;

   @IsString()
   @IsNotEmpty()
   resetCode: string;

   @IsString()
   @IsOptional()
   resetLink?: string;
}

export class SendOrderConfirmationMailDto {
   @IsEmail()
   @IsNotEmpty()
   to: string;

   @IsString()
   @IsNotEmpty()
   username: string;

   @IsString()
   @IsNotEmpty()
   orderId: string;

   @IsString()
   @IsNotEmpty()
   orderDate: string;

   @IsString()
   @IsNotEmpty()
   orderStatus: string;

   @IsString()
   @IsNotEmpty()
   deliveryAddress: string;

   @IsNotEmpty()
   items: Array<{
      name: string;
      quantity: number;
      price: string;
      subtotal: string;
   }>;

   @IsString()
   @IsNotEmpty()
   totalAmount: string;

   @IsString()
   @IsOptional()
   trackingLink?: string;
}

export class SendWelcomeMailDto {
   @IsEmail()
   @IsNotEmpty()
   to: string;

   @IsString()
   @IsNotEmpty()
   username: string;

   @IsString()
   @IsOptional()
   loginLink?: string;
}
