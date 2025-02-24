export default () => ({
    HOME: process.env.HOME,
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST,
    PORT: process.env.PORT,

    MAIL_SMTP_HOSTNAME: process.env.MAIL_SMTP_HOSTNAME || '',
    MAIL_PORT: process.env.MAIL_PORT || 587,
    MAIL_USERNAME: process.env.MAIL_USERNAME || '',
    MAIL_PASSWORD: process.env.MAIL_PASSWORD || '',
    MAIL_FROM: process.env.MAIL_FROM || '',

    JWT_SECRET: process.env.JWT_SECRET || '',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || 21600,

    DB_TYPE: process.env.DB_TYPE,
    DB_HOST: process.env.POSTGRES_HOST,
    DB_PORT: process.env.POSTGRES_PORT,
    DB_USERNAME: process.env.POSTGRES_USER,
    DB_PASSWORD: process.env.POSTGRES_PASSWORD,
    DB_DATABASE: process.env.POSTGRES_DB,
});