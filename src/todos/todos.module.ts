import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { User } from 'src/users/entities/user.entity';
import { Todo } from './entities/todo.entity';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, User]), PassportModule],
  controllers: [TodosController],
  providers: [TodosService],
  exports: [TodosService, TypeOrmModule.forFeature([Todo, User])],
})
export class TodosModule {}
