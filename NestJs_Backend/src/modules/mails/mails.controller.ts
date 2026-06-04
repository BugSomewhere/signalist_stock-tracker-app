import { Controller, Post, Body, Get } from '@nestjs/common';
import { MailsService } from './mails.service';
import {
   SendMailDto,
   SendRegisterMailDto,
   SendResetPasswordMailDto,
   SendOrderConfirmationMailDto,
   SendWelcomeMailDto,
} from './dto/send-mail.dto';
import { Public } from '@/decorators/public.decorator';

@Controller('mails')
export class MailsController {
   constructor(private readonly mailsService: MailsService) { }

   /**
    * Send a generic email
    */
   @Post('send')
   async sendMail(@Body() sendMailDto: SendMailDto) {
      return await this.mailsService.sendMail(sendMailDto);
   }

   /**
    * Send registration confirmation email
    */
   @Post('register')
   async sendRegisterMail(@Body() dto: SendRegisterMailDto) {
      return await this.mailsService.sendRegisterMail(dto);
   }

   /**
    * Send password reset email
    */
   @Post('reset-password')
   async sendResetPasswordMail(@Body() dto: SendResetPasswordMailDto) {
      return await this.mailsService.sendResetPasswordMail(dto);
   }

   /**
    * Send order confirmation email
    */
   @Post('order-confirmation')
   async sendOrderConfirmationMail(@Body() dto: SendOrderConfirmationMailDto) {
      return await this.mailsService.sendOrderConfirmationMail(dto);
   }

   /**
    * Send welcome email
    */
   @Post('welcome')
   async sendWelcomeMail(@Body() dto: SendWelcomeMailDto) {
      return await this.mailsService.sendWelcomeMail(dto);
   }

   /**
    * Test endpoint to send a test email
    */
   @Public()
   @Get('test')
   async sendTestMail() {
      return await this.mailsService.sendRegisterMail({
         to: 'test@example.com',
         username: 'Test User',
         activationCode: '123456',
         activationLink: 'http://localhost:5173/activate?code=123456',
      });
   }
}
