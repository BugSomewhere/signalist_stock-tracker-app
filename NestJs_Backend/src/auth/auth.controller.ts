import { Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from '@/decorators/public.decorator';
import { MailerService } from '@nestjs-modules/mailer/dist/mailer.service';

@Controller('auth')
export class AuthController {
   constructor(private authService: AuthService, private mailerService: MailerService) { }

   @UseGuards(LocalAuthGuard)
   @Post('login')
   login(@Request() req: any) {
      return this.authService.login(req.user);
   }

   @UseGuards(JwtAuthGuard)
   @Post('profile')
   getProfile(@Request() req: any) {
      const userId = req.user?.userId ?? req.user?._id;
      return this.authService.getProfile(userId);
   }

   @Public()
   @Get('mail')
   async sendTestMail() {
      await this.mailerService.sendMail({
         to: 'Kietpham20202020@gmail.com',
         subject: 'Test Email',
         text: 'This is a test email from NestJS application.',
      });
      return { message: 'Test email sent' };
   }
}