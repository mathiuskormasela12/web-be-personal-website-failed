// ========== Main
// import all modules
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import compression from '@fastify/compress';
import helmet from '@fastify/helmet';
import fastifyCsrf from '@fastify/csrf-protection';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
  );

  // Setup compression
  await app.register(compression);

  // Setup helmet
  await app.register(helmet);

  // Setup Csrf
  await app.register(fastifyCsrf);

  const appPort: number = app
    .get(ConfigService)
    .get<number>('SERVICE_APP_PORT');
  const appUrl: string = app.get(ConfigService).get<string>('SERVICE_APP_URL');
  const webClients: string[] = app
    .get(ConfigService)
    .get<string>('SERVICE_WEB_CLIENTS')
    .split(',');

  // Setup Cors
  app.enableCors({
    origin: webClients,
  });

  // Setup Base Url
  app.setGlobalPrefix('/api');

  // Setup Swagger UI
  const config = new DocumentBuilder()
    .setTitle('Personal Website')
    .setDescription("The personal website's RESTful API")
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Setup Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(appPort, '0.0.0.0');
  Logger.log(`The Personal Website RESTful API is being run at ${appUrl}`);
}
bootstrap();
