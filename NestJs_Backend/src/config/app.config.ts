import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
	port: parseInt(process.env.APP_PORT, 10) || 3000,
	environment: process.env.NODE_ENV || "development",
	apiPrefix: process.env.API_PREFIX || "api",
	apiVersion: process.env.API_VERSION || "v1",
}));
