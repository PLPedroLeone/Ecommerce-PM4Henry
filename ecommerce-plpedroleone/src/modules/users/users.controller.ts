import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateUserDto } from './dto/users.dto';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @HttpCode(200)
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getAllUsers(@Query('page') page?: number, @Query('limit') limit?: number) {
    if (page && limit) {
      return this.usersService.getAllUsers(page, limit);
    }
    return this.usersService.getAllUsers(1, 5);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatedUser: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updatedUser);
  }

  @Put('superAdmin/:id')
  @Roles(Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  updateAdminUser (
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.usersService.updateAdminUser(id);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}
