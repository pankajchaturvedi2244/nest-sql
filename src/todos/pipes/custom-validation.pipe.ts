import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { Todo } from '../entities/todo.entity';
import { UserDTO } from '../dto/create-todo.dto';

@Injectable()
export class TodoValidationPipe implements PipeTransform {
  // constructor(private readonly userService: UsersService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    // Apply ValidationPipe to validate other fields according to the DTO
    const validationPipe = new ValidationPipe();
    await validationPipe.transform(value, metadata);
    console.log(value, 'value');
    // Validate and transform date timestamp strings to Unix timestamps
    const password = value.password;
    if (password) {
      if (password.length < 4) {
        throw new BadRequestException(
          'Password must be at least 4 characters long',
        );
      } else {
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        value.password = hashedPassword;
      }
    }

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
    const todo = new Todo();
    todo.completed = dto.completed === 'true' ? 1 : 0;
    todo.title = dto.title;
    todo.id = dto.id;
    todo.userId = user.id;

    return todo;
  }
}
