// ========== Auth Controller
// import all modules
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from './../src/auth/auth.module';
import { RegisterDto } from '../src/auth/dto/register.dto';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/v1/auth/register (POST)', () => {
    const body: RegisterDto = {
      name: 'Jhon Doe',
      email: 'jhon@mail.com',
    };
    return request(app.getHttpServer())
      .post('/v1/auth/register')
      .send(body)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          statusCode: 201,
          message: 'Created',
          data: body,
        });
      });
  });
});
