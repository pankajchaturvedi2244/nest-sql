import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ParseIntPipe,
  ValidationPipe,
  Post,
} from '@nestjs/common';
import { PostValidationPipe } from './pipes/custom-validation.pipe';
import { PostsService } from './posts.service';
import { Post as PostSchemaEnt } from './entities/post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(
    @Body(new PostValidationPipe())
    createTodoDto: PostSchemaEnt,
  ) {
    return this.postsService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body(
      new ValidationPipe({ skipMissingProperties: false }),
      new PostValidationPipe(),
    )
    updateTodoDto: PostSchemaEnt,
  ) {
    return this.postsService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
