import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

export const MIGRATIONS_TABLE = 'migration';

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env['DB_HOST'],
  port: +process.env['DB_PORT'],
  username: process.env['DB_USERNAME'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_DATABASE'],
  logging: true,
  synchronize: false,
  migrationsTableName: MIGRATIONS_TABLE,
  entities: [path.join(__dirname, '..', 'src', '**', '*.entity.js')],
  migrations: [path.join(__dirname, 'history', '*.js')],
};

export default new DataSource(config);
