import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource } from 'typeorm';

dotenv.config();
const migrationsPath = path.join(__dirname, '..', '..', 'migration', '*.ts');

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [path.join(process.cwd(), '**', '*.entity.{ts,js}')],
  migrations: [migrationsPath],
  subscribers: ['src/subscriber/**/*{.js,.ts}'],
  // do NOT use synchronize: true in real projects
  synchronize: true,
  logging: true,
  logger: 'advanced-console',
  migrationsRun: true,
});
