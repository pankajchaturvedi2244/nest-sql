import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class MysqlConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('MYSQL_DB_HOST'),
      port: this.configService.get<number>('MYSQL_DB_PORT'),
      username: this.configService.get<string>('MYSQL_DB_USERNAME'),
      password: this.configService.get<string>('MYSQL_DB_PASSWORD'),
      database: this.configService.get<string>('MYSQL_DB_NAME'),
      synchronize: false,
      logging: true,
      autoLoadEntities: true,
    };
  }
}
