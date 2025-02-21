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
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
});