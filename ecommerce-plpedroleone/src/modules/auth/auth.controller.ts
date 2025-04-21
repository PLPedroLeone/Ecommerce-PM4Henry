import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/users.dto';
import { LoginUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  authSignup(@Body() user: CreateUserDto) {
    return this.authService.authSignUp(user);
  }

  @Post('/signin')
  authSingnin(@Body() credentials: LoginUserDto) {
    return this.authService.authSignIn(credentials);
  }
}
