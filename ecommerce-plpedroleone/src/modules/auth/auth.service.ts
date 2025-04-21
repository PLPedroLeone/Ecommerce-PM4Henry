import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../users/dto/users.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async authSignUp(user: CreateUserDto): Promise<Partial<Users>> {
    const { confirmPassword, ...userWithoutPasswordConfirmation } = user;

    const findUser = await this.usersRepository.findOneBy({
      email: user.email,
    });

    if (findUser) throw new BadRequestException('User already registered');

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await this.usersRepository.save({
      ...userWithoutPasswordConfirmation,
      password: hashedPassword,
    });
    const { password, isAdmin, ...userWithoutPasswordandRole } = newUser;

    return userWithoutPasswordandRole;
  }

  async authSignIn(credentials: LoginUserDto) {
    const { email, password } = credentials;

    const findUser = await this.usersRepository.findOneBy({ email });

    if (!findUser) throw new BadRequestException('Wrong Email or password');

    const passwordMatch = await bcrypt.compare(password, findUser.password);

    if (!passwordMatch)
      throw new BadRequestException('Wrong Email or password');

    const userPayload = {
      id: findUser.id,
      email: findUser.email,
      isAdmin: findUser.isAdmin,
      isSuperAdmin: findUser.isSuperAdmin,
    };

    const token = this.jwtService.sign(userPayload);

    return {
      message: 'Login Successful',
      token,
    };
  }
}
