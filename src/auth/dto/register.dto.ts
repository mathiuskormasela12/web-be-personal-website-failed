// ========== Register Dto
// import all modules
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    title: 'Name',
    type: String,
    default: 'Jhon Doe',
    required: true,
  })
  @IsString({ message: 'Name should be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({
    title: 'Email',
    type: String,
    default: 'jhon@mail.com',
    required: true,
  })
  @IsEmail({}, { message: 'Email is invalid' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
}
