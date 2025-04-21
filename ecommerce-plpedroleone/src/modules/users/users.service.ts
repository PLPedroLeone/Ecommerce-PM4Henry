import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getAllUsers(page: number, limit: number) {
    let users = await this.usersRepository.find();

    const start = (page - 1) * limit;
    const end = start + limit;

    users = users.slice(start, end);

    return users.map(({ password, ...user }) => user);
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOneBy({ id: id });

    if (!user) throw new NotFoundException('User not found');

    const { password, isAdmin, ...userWithoutPasswordandRole } = user;

    return userWithoutPasswordandRole;
  }

  async updateUser(id: string, updatedUser: UpdateUserDto): Promise<string> {
    const user = await this.usersRepository.findOneBy({ id: id });

    if (!user) throw new NotFoundException('User not found');

    await this.usersRepository.update(id, { ...user, ...updatedUser });

    return 'User updated';
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.findOneBy({ id: id });

    if (!user) throw new NotFoundException('User not found');

    await this.usersRepository.delete(id);

    return 'User deleted';
  }

  async updateAdminUser(id: string): Promise<string> {
    const user = await this.usersRepository.findOneBy({ id: id });

    if (!user) throw new NotFoundException('User not found');

    await this.usersRepository.update(id, { ...user, isAdmin: !user.isAdmin});

    return 'Admin user updated'
  }
}
