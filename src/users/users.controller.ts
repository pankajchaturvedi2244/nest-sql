import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UserSchemaDecorator } from './decorators/userSchemaDecorator';
import { TransformResponseInterceptor } from './interceptors/transform-response.interceptor';
import { JwtAuthGuard } from 'src/gurards/jwt.guard';
import { CustomValidationPipe } from './pipes/custom-validation.pipe';
import { User } from './entities/user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard)
@UseInterceptors(TransformResponseInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new CustomValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new CustomValidationPipe()) updateUserDtoToEnt: User,
  ) {
    return this.usersService.update(+id, updateUserDtoToEnt);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
