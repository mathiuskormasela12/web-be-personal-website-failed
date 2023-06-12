// ========== Auth Controller
// import all modules
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IResponse } from '../types';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public register(@Body() dto: RegisterDto): IResponse<RegisterDto> {
    const result = this.authService.registerUser(dto);
    return result;
  }
}
