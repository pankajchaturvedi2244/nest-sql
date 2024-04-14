import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PostDto } from '../dto/create-comment.dto';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentValidationPipe implements PipeTransform {
  // constructor(private readonly userService: UsersService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    // Apply ValidationPipe to validate other fields according to the DTO
    const validationPipe = new ValidationPipe();
    await validationPipe.transform(value, metadata);
    // Validate and transform date timestamp strings to Unix timestamps

    const dto = value;
    // Transform user object to individual fields

    const post = plainToClass(PostDto, dto.post);

    const todo = new Comment();
    todo.body = dto.body;
    todo.name = dto.name;
    todo.id = dto.id;
    todo.postId = post.id;

    return todo;
  }
}
