import joi from "joi";
import dotenv from "dotenv";

dotenv.config();

const envSchema = joi
    .object({
        PORT: joi.string().required(),
        DB_HOST: joi.string().required(),
        DB_PORT: joi.number().required(),
        DB_USER: joi.string().required(),
        /*DB_PASSWORD: joi.string().required(),*/
        DB_NAME: joi.string().required(),
    })
    .unknown(true);

const { value: enVars, error } = envSchema.validate(process.env);

if (error) throw new Error(`config validation error : ${error.message}`);

export const envs = {
    PORT: enVars.PORT,
    DB_HOST: enVars.DB_HOST,
    DB_USER: enVars.DB_USER,
    DB_NAME: enVars.DB_NAME,
    DB_PASSWORD: enVars.DB_PASSWORD,
};