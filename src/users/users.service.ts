import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  create(createUserDto: any) {
    const newUser = this.repo.create(createUserDto);
    return this.repo.save(newUser);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
    });
  }

  findOneByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }
  async update(id: number, updateUserEntity: User) {
    const user = this.findOne(id);
    if (!user) throw new BadRequestException(`User with id ${id} not found`);
    const update = await this.repo.update(id, updateUserEntity);
    if (update.affected > 0) {
      return this.findOne(id);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
