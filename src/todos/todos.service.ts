import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todo) private repo: Repository<Todo>) {}

  async create(createTodoEntity: Todo) {
    const newUser = this.repo.create(createTodoEntity);
    await this.repo.save(newUser);
    return this.findOne(newUser.id);
  }

  findAll() {
    // from this was'nt able to get specific fields from user
    // return this.repo.find({
    //   relations: ['user'],
    //   select: ['id', 'title', 'completed', 'user.id'],
    // });

    return this.repo
      .createQueryBuilder('todo')
      .leftJoinAndSelect('todo.user', 'user')
      .select([
        'todo.id',
        'todo.title',
        'todo.completed',
        'user.name',
        'user.email',
        'user.username',
      ])
      .getMany();
  }

  async findOne(id: number) {
    const post = await this.repo.findOne({
      where: { id },
      relations: ['user'],
    });
    return this.filterOnlyRequiredFields(post);
  }

  async update(id: number, updateTodoEntity: Todo) {
    const updated = await this.repo.update(id, updateTodoEntity);
    if (updated.affected) {
      return this.findOne(id);
    }
    return null;
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  // just to avoid sending all the fields
  private filterOnlyRequiredFields(todo: Todo) {
    const { id, title, completed, user } = todo;
    return {
      id,
      title,
      completed: completed === 1 ? true : false,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    };
  }
}
