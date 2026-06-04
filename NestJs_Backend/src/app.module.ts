import { Module } from "@nestjs/common";
import { UsersModule } from "@/modules/users/users.module";

import { MailsModule } from '@/modules/mails/mails.module';
import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';


@Module({
	imports: [
		// TypeORM async config
		// TypeOrmModule.forRootAsync({
		// 	inject: [ConfigService],
		// 	useFactory: (configService: ConfigService) => {
		// 		const db = configService.get("database", { infer: true });

		// 		return {
		// 			type: db.type,
		// 			host: db.host,
		// 			port: db.port,
		// 			username: db.username,
		// 			password: db.password,
		// 			database: db.database,
		// 			synchronize: db.synchronize,
		// 			logging: db.logging,
		// 			autoLoadEntities: true,
		// 			timezone: "+07:00",
		// 		};
		// 	},
		// }),
		MongooseModule.forRootAsync({
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('MONGODB_URI'),
			}),
		}),
		ConfigModule.forRoot({ isGlobal: true }),
		UsersModule,

		AuthModule,
		MailerModule.forRootAsync({
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				transport: {
					host: configService.get<string>('MAILER_HOST'),
					port: Number(configService.get<number>('MAILER_PORT')),
					secure: true,
					auth: {
						user: configService.get<string>('MAILER_USER'),
						pass: configService.get<string>('MAILER_PASS'), // App password
					},
				},
				defaults: {
					from: '"No Reply" <no-reply@example.com>',
				},
				template: {
					dir: join(__dirname, 'templates'),
					adapter: new HandlebarsAdapter(),
					options: {
						strict: true,
					},
				},
			}),
		}),
		MailsModule,
	],
	controllers: [AppController],
	providers: [AppService,
		// {
		// 	provide: APP_GUARD,
		// 	useClass: JwtAuthGuard
		// }
	],
})
export class AppModule { }
