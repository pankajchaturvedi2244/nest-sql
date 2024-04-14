import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Post } from '../entities/post.entity';
import { UserDTO } from '../dto/create-post.dto';

@Injectable()
export class PostValidationPipe implements PipeTransform {
  // constructor(private readonly userService: UsersService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    // Apply ValidationPipe to validate other fields according to the DTO
    const validationPipe = new ValidationPipe();
    await validationPipe.transform(value, metadata);

    const dto = value;
    // Transform user object to individual fields

    const user = plainToClass(UserDTO, dto.user);
    // if (!user || !user?.id) {
    //   // if user is not present in the request body
    //   // throw an error
    //   if (!user) {
    //     throw new BadRequestException('User is required');
    //   }
    //   // if user is present but id is not present
    //   // throw an error
    //   if (!user?.id) {
    //     throw new BadRequestException('User ID is required');
    //   }
    // }
    const todo = new Post();
    todo.body = dto.body;
    todo.title = dto.title;
    todo.id = dto.id;
    todo.userId = user.id;

    return todo;
  }
}
