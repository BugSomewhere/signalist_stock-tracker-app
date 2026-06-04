import { UserDocument } from '@/modules/users/schemas/users.schema';
import { UsersService } from '@/modules/users/users.service';
import { comparePasswords } from '@/utils/util';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
   constructor(private usersService: UsersService, private jwtService: JwtService) {}

   async validateUser(email: string, password: string): Promise<any> {
      const user = await this.usersService.findOneByEmail(email);
      const passwordValid = await comparePasswords(password, user.password);
      if (user && passwordValid) {
         const { password, ...result } = user.toObject();
         return result;
      }
      return null;
   }

   async login(user: UserDocument) {
      const payload = { email: user.email, sub: user._id };
      return {
         access_token: this.jwtService.sign(payload),
      };
   }

   async getProfile(userId: string) {
      const user = await this.usersService.findOne(userId);
      const { password, ...result } = user.toObject();
      return result;
   }
}
