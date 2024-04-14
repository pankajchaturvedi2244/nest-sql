import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConfigService } from './mysql-config/mysql-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: MysqlConfigService,
    }),
  ],
  controllers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
