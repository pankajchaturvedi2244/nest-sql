import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { AddressDto } from '@app/common/dtos/address.dto';
import { GeoDto } from '../dto/geo.dto';
import { CompanyDto } from '../dto/company.dto';
import { plainToClass } from 'class-transformer';

export const UserSchemaDecorator = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const password = request.body.password;
    if (password) {
      if (password.length < 4) {
        throw new BadRequestException(
          'Password must be at least 4 characters long',
        );
      } else {
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        request.body.password = hashedPassword;
      }
    }
    const dto = request.body;
    // Transform address object to individual fields
    const address = plainToClass(AddressDto, dto.address);
    const geo = plainToClass(GeoDto, dto.address.geo);
    const company = plainToClass(CompanyDto, dto.company);

    const user = new User();
    user.name = dto.name;
    user.username = dto.username;
    user.email = dto.email;
    user.password = dto.password;
    user.street = address.street;
    user.suite = address.suite;
    user.city = address.city;
    user.zipcode = address.zipcode;
    user.lat = geo.lat;
    user.lng = geo.lng;
    user.phone = dto.phone;
    user.website = dto.website;
    user.company = company.name;
    user.catchPhrase = company.catchPhrase;
    user.bs = company.bs;

    return user;
  },
);
