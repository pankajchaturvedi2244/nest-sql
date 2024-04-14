import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

  async create(createTodoEntity: Post) {
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
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.user', 'user')
      .select([
        'posts.id',
        'posts.title',
        'posts.body',
        'user.name',
        'user.email',
        'user.username',
        'user.id',
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

  async update(id: number, updateTodoEntity: Post) {
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
  private filterOnlyRequiredFields(posts: Post) {
    const { id, title, body, user } = posts;
    return {
      id,
      title,
      body,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    };
  }
}
