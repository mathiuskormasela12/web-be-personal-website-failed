// ========== Auth Module
// import all modules
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ResponseInterceptor } from '../interceptors/response.interceptor';

@Module({
  controllers: [AuthController],
  providers: [
    // Setup Response Interceptor
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },

    // Setup Validation Pipes
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },

    // Define Auth Providers
    AuthService,
  ],
})
export class AuthModule {}
