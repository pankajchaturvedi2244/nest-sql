import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  // username is a required field
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  // password is a required field
  @IsString()
  @IsNotEmpty()
  password: string;
}
