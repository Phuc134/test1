import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async getAllUser(@Res() res: Response) {
    const listUsers = await this.usersService.getAllUser();
    console.log(listUsers);
    res.status(HttpStatus.CREATED).send({
      users: listUsers,
    });
  }
  @Post()
  createuser(@Body() user: UserDTO): Promise<User> {
    return this.usersService.createUser(user);
  }
  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }
  @Put(':id')
  upadteUserById(
    @Param('id') id: string,
    @Body() user: UserDTO,
  ): Promise<User> {
    return this.usersService.updateUserById(id, user);
  }
  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }
}
