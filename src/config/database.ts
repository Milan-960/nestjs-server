import * as path from 'path';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MIGRATIONS_TABLE } from 'migration/config';

const migrationsPath = path.join(__dirname, '..', '..', 'migration', '*.ts');

export const getDbConfig = (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [],
    migrationsTableName: MIGRATIONS_TABLE,
    migrations: [migrationsPath],
    migrationsRun: true,
    synchronize: false,
    retryAttempts: 1,
    autoLoadEntities: false,
  };
};
