import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './member/member.module';

const migrationsPath = path.join(__dirname, '..', '..', 'migration', '*.ts');

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
        migrations: [migrationsPath],
        // do NOT use synchronize: true in real projects
        synchronize: true,
        logging: true,
        logger: 'advanced-console',
        migrationsRun: true,
      }),
      inject: [ConfigService],
    }),
    MembersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
