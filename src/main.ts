import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Restrict CORS to your frontend app domain
  // const configService = app.get(ConfigService);
  // const frontendUrl = configService.get('FRONTEND_URL');
  app.enableCors({
    origin: true,
    credentials: true,
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 3600,
    exposedHeaders: 'Authorization',
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
