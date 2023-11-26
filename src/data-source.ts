import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [join(process.cwd(), 'dist/**/*.entity.js')],
  migrations: [join(process.cwd(), 'dist/migration/*.js')],
  subscribers: ['src/subscriber/**/*{.js,.ts}'],
  // do NOT use synchronize: true in real projects
  synchronize: true,
  logging: true,
  logger: 'advanced-console',
  migrationsRun: true,
});
