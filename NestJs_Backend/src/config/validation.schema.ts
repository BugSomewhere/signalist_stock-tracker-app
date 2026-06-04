import * as Joi from "joi";

export const validationSchema = Joi.object({
	// App
	NODE_ENV: Joi.string()
		.valid("development", "production", "test")
		.default("development"),
	APP_PORT: Joi.number().default(3000),
	API_PREFIX: Joi.string().default("api"),
	API_VERSION: Joi.string().default("v1"),

	// Database
	DB_HOST: Joi.string().required(),
	DB_PORT: Joi.number().default(3307),
	DB_USERNAME: Joi.string().required(),
	DB_PASSWORD: Joi.string().allow("").optional(),
	DB_NAME: Joi.string().required(),
});

export default validationSchema;
