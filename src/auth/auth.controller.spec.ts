// ========== Auth Controller Spec
// import all modules
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const auth: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = auth.get<AuthController>(AuthController);
  });

  describe('Register User', () => {
    it('should return status code 201', () => {
      const body: RegisterDto = {
        name: 'Jhon Doe',
        email: 'jhon@mail.com',
      };
      expect(authController.register(body)).toEqual({
        statusCode: 201,
        message: 'Created',
        data: body,
      });
    });
  });
});
