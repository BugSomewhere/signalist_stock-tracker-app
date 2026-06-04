import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import {
   SendMailDto,
   SendRegisterMailDto,
   SendResetPasswordMailDto,
   SendOrderConfirmationMailDto,
   SendWelcomeMailDto,
} from './dto/send-mail.dto';

@Injectable()
export class MailsService {
   private readonly logger = new Logger(MailsService.name);

   constructor(private readonly mailerService: MailerService) { }

   /**
    * Send a generic email
    */
   async sendMail(sendMailDto: SendMailDto): Promise<{ success: boolean; message: string }> {
      try {
         await this.mailerService.sendMail({
            to: sendMailDto.to,
            subject: sendMailDto.subject,
            text: sendMailDto.text,
            template: sendMailDto.template,
            context: sendMailDto.context,
         });

         this.logger.log(`Email sent successfully to ${sendMailDto.to}`);
         return { success: true, message: 'Email sent successfully' };
      } catch (error) {
         this.logger.error(`Failed to send email to ${sendMailDto.to}`, error.stack);
         throw error;
      }
   }

   /**
    * Send registration confirmation email
    */
   async sendRegisterMail(dto: SendRegisterMailDto): Promise<{ success: boolean; message: string }> {
      try {
         await this.mailerService.sendMail({
            to: dto.to,
            subject: 'Xác nhận đăng ký tài khoản',
            template: 'register',
            context: {
               username: dto.username,
               activationCode: dto.activationCode,
               activationLink: dto.activationLink,
               year: new Date().getFullYear(),
            },
         });

         this.logger.log(`Registration email sent to ${dto.to}`);
         return { success: true, message: 'Registration email sent successfully' };
      } catch (error) {
         this.logger.error(`Failed to send registration email to ${dto.to}`, error.stack);
         throw error;
      }
   }

   /**
    * Send password reset email
    */
   async sendResetPasswordMail(dto: SendResetPasswordMailDto): Promise<{ success: boolean; message: string }> {
      try {
         await this.mailerService.sendMail({
            to: dto.to,
            subject: 'Đặt lại mật khẩu',
            template: 'reset-password',
            context: {
               username: dto.username,
               resetCode: dto.resetCode,
               resetLink: dto.resetLink,
               year: new Date().getFullYear(),
            },
         });

         this.logger.log(`Password reset email sent to ${dto.to}`);
         return { success: true, message: 'Password reset email sent successfully' };
      } catch (error) {
         this.logger.error(`Failed to send password reset email to ${dto.to}`, error.stack);
         throw error;
      }
   }

   /**
    * Send order confirmation email
    */
   async sendOrderConfirmationMail(dto: SendOrderConfirmationMailDto): Promise<{ success: boolean; message: string }> {
      try {
         await this.mailerService.sendMail({
            to: dto.to,
            subject: `Xác nhận đơn hàng #${dto.orderId}`,
            template: 'order-confirmation',
            context: {
               username: dto.username,
               orderId: dto.orderId,
               orderDate: dto.orderDate,
               orderStatus: dto.orderStatus,
               deliveryAddress: dto.deliveryAddress,
               items: dto.items,
               totalAmount: dto.totalAmount,
               trackingLink: dto.trackingLink,
               year: new Date().getFullYear(),
            },
         });

         this.logger.log(`Order confirmation email sent to ${dto.to}`);
         return { success: true, message: 'Order confirmation email sent successfully' };
      } catch (error) {
         this.logger.error(`Failed to send order confirmation email to ${dto.to}`, error.stack);
         throw error;
      }
   }

   /**
    * Send welcome email after account activation
    */
   async sendWelcomeMail(dto: SendWelcomeMailDto): Promise<{ success: boolean; message: string }> {
      try {
         await this.mailerService.sendMail({
            to: dto.to,
            subject: 'Chào mừng bạn đến với chúng tôi!',
            template: 'welcome',
            context: {
               username: dto.username,
               loginLink: dto.loginLink || 'http://localhost:5173/login',
               year: new Date().getFullYear(),
            },
         });

         this.logger.log(`Welcome email sent to ${dto.to}`);
         return { success: true, message: 'Welcome email sent successfully' };
      } catch (error) {
         this.logger.error(`Failed to send welcome email to ${dto.to}`, error.stack);
         throw error;
      }
   }
}
