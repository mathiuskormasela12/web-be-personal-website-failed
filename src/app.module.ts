// ========== App Module
// import all modules
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Setup Config Module
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Setup Rate Limiter
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get<number>('SERVICE_RATE_LIMITER_TTL'),
        limit: configService.get<number>('SERVICE_RATE_LIMITER_LIMIT'),
      }),
      inject: [ConfigService],
    }),

    // Setup Static Files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      renderPath: '/static',
      serveRoot: '/static',
    }),

    // Define All Application Module
    AuthModule,
  ],
})
export class AppModule {}
