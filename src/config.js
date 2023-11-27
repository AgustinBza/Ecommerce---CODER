import 'dotenv/config';

export const config = {
    PORT: process.env.PORT,
    PERSISTENCE: process.env.PERSISTENCE,
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL,
    SECRET_KEY: process.env.SECRET_KEY,
    GMAIL_PASS: process.env.GMAIL_PASS,
    GMAIL : process.env.GMAIL,
    ENVIRONMENT: process.env.ENVIRONMENT,
    SECRET_COOKIES: process.env.SECRET_COOKIES
}