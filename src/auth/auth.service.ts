// ========== Auth Service
// import all modules
import { HttpStatus, Injectable } from '@nestjs/common';
import { IResponse } from '../types';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  public registerUser(dto: RegisterDto): IResponse<RegisterDto> {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Created',
      data: dto,
    };
  }
}
