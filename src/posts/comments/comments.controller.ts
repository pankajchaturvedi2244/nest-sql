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
import { CommentValidationPipe } from './pipes/custom-validation.pipe';
import { Comment } from './entities/comment.entity';
import { CommentsService } from './comments.service';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(
    @Param('postId') postId: number,
    @Body(new CommentValidationPipe())
    createDto: Comment,
  ) {
    return this.commentService.create(postId, createDto);
  }

  @Get()
  findAll(@Param('postId') postId: number) {
    return this.commentService.findAll(postId);
  }

  @Get(':id')
  findOne(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.commentService.findOne(+postId, +id);
  }

  @Patch(':id')
  update(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body(
      new ValidationPipe({ skipMissingProperties: false }),
      new CommentValidationPipe(),
    )
    updateCommentDto: Comment,
  ) {
    return this.commentService.update(postId, +id, updateCommentDto);
  }

  @Delete(':id')
  remove(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('id', ParseIntPipe) id: string,
  ) {
    return this.commentService.remove(postId, +id);
  }
}
