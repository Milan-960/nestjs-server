import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/entity/**/*{.js,.ts}'],
  migrations: ['src/migration/**/*{.js,.ts}'],
  subscribers: ['src/subscriber/**/*{.js,.ts}'],
  // do NOT use synchronize: true in real projects
  synchronize: true,
  logging: true,
  logger: 'advanced-console',
  migrationsRun: true,
});
