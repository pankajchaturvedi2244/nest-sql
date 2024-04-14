import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Public } from '@app/common/decorators/public.decorator';
// import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  @Post('login')
  @Public()
  @UsePipes(ValidationPipe)
  async login(@Req() req, @Body() payLoad: AuthDto) {
    console.log('login', payLoad);
    const user = await this.authService.validateUser(payLoad);
    console.log(user, 'useruser');
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Invalid Credentials',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }
}
