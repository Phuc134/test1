import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from './dto/user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async getAllUser(): Promise<User[]> {
    const listUser = await this.userRepository.find();
    return listUser;
  }
  async createUser(userDTO: UserDTO): Promise<User> {
    try {
      const { name, email, password, typeUser } = userDTO;
      const user = new User();
      user.name = name;
      user.email = email;
      user.password = password;
      user.typeUser = typeUser;
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      console.log(error.message);
    }
  }
  async getUserById(id: string): Promise<User> {
    try {
      const user = this.userRepository.findOne({
        where: { id },
      });
      return user;
    } catch (error) {
      console.log(error.message);
    }
  }

  async updateUserById(id: string, userDTO: UserDTO): Promise<User> {
    const { name, email, typeUser } = userDTO;
    const userUpdate = await this.userRepository.findOneBy({ id: id });
    userUpdate.name = name ? name : userUpdate.name;
    userUpdate.email = email ? email : userUpdate.email;
    userUpdate.typeUser = typeUser ? typeUser : userUpdate.typeUser;
    const user = await this.userRepository.save(userUpdate);
    return user;
  }

  async deleteUserById(id: string) {
    return await this.userRepository.delete(id);
  }
}
