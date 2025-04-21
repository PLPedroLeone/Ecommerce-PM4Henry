import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Role } from './roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const requestHeader = request.headers.authorization;

    if (!requestHeader) return false;

    const tokenParts = requestHeader.split(' ');
    if(tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') throw new UnauthorizedException('Formato de Token incorrecto');

    const token = tokenParts[1];

    if (!token) throw new UnauthorizedException('Missing Token');

    try {
      const secret = process.env.JWT_SECRET;
      const user = this.jwtService.verify(token, { secret });

      user.exp = new Date(user.exp * 1000);
      user.iat = new Date(user.iat * 1000);

      if (user.isAdmin) {
        user.roles = [Role.Admin];
      } else {
        user.roles = [Role.User];
      }

      if (user.isSuperAdmin) {
        user.roles = [Role.SuperAdmin];
      } else {
        user.roles = [Role.User];
      }

      request.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid Token');
    }
  }
}
