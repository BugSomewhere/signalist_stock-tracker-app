import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";
import { TransformInterceptor } from "./common/interceptors/transform.interceptor";

async function bootstrap() {
	const logger = new Logger("Bootstrap");
	const app = await NestFactory.create(AppModule);

	// Get config service
	const configService = app.get(ConfigService);
	const port = configService.get<number>("PORT");
	const apiPrefix = configService.get<string>("API_PREFIX");

	// Enable CORS for React frontend
	app.enableCors({
		origin: ["http://localhost:5173", "http://localhost:4000"],
		credentials: true,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	});

	// Set global prefix
	app.setGlobalPrefix(apiPrefix, { exclude: [''] });

	// Global filters
	app.useGlobalFilters(new AllExceptionsFilter());

	// Global interceptors
	app.useGlobalInterceptors(
		new LoggingInterceptor(),
		new TransformInterceptor(),
	);

	// Global validation pipe
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
		}),
	);

	await app.listen(port);

	logger.log(
		`🚀 Application is running on: http://localhost:${port}/${apiPrefix}`,
	);
	logger.log(`📝 Environment: ${configService.get("NODE_ENV")}`);
}

bootstrap();
