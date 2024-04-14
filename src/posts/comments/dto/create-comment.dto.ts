import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  body: string;

  //   there is an user id in the posts object
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PostDto)
  post: PostDto;
}
