import { registerAs } from "@nestjs/config";

export default registerAs("database", () => ({
	type: "mysql" as const,
	host: process.env.DB_HOST || "localhost",
	port: parseInt(process.env.DB_PORT) || 3306,
	username: process.env.DB_USERNAME || "root",
	password: process.env.DB_PASSWORD || "123456",
	database: process.env.DB_NAME || "nestjs_db",
	synchronize: process.env.NODE_ENV === "development",
	logging: process.env.NODE_ENV === "development",
}));
