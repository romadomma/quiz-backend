export const dbConfig = () => ({
  dbConfig: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logger: 'advanced-console',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  },
});
