import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment) private repo: Repository<Comment>) {}

  async create(postId: number, createTodoEntity: Comment) {
    const newEntry = this.repo.create(createTodoEntity);
    await this.repo.save(newEntry);
    return this.findOne(postId, newEntry.id);
  }

  findAll(postId: number) {
    // from this was'nt able to get specific fields from user
    // return this.repo.find({
    //   relations: ['user'],
    //   select: ['id', 'title', 'completed', 'user.id'],
    // });

    return this.repo
      .createQueryBuilder('comments')
      .leftJoinAndSelect('comments.post', 'post')
      .select([
        'comments.id',
        'comments.name',
        'comments.body',
        'comments.email',
        'post.id',
      ])
      .where('post.id = :postId', { postId })
      .getMany();
  }

  async findOne(postId: number, id: number) {
    const post = await this.repo.findOne({
      where: { id, postId },
      relations: ['post'],
    });
    if (!post) {
      return null;
    }
    return this.filterOnlyRequiredFields(post);
  }

  async update(postId: number, id: number, updateTodoEntity: Comment) {
    const updated = await this.repo.update(id, updateTodoEntity);
    if (updated.affected) {
      return this.findOne(postId, id);
    }
    return null;
  }

  remove(postId, id: number) {
    return this.repo.delete({
      id,
      post: {
        id: postId,
      },
    });
  }

  // just to avoid sending all the fields
  private filterOnlyRequiredFields(comments: Comment) {
    const { id, name, body, email, post } = comments;
    return {
      id,
      name,
      body,
      email,
      post: {
        id: post.id,
      },
    };
  }
}
