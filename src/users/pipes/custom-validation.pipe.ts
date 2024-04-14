import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { CompanyDto } from '../dto/company.dto';
import { AddressDto } from '@app/common/dtos/address.dto';
import { GeoDto } from '../dto/geo.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
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
    // Transform address object to individual fields

    const address = plainToClass(AddressDto, dto.address);
    const geoData = plainToClass(GeoDto, address.geo);
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
    user.lat = geoData?.lat;
    user.lng = geoData?.lng;
    user.phone = dto.phone;
    user.website = dto.website;
    user.company = company.name;
    user.catchPhrase = company.catchPhrase;
    user.bs = company.bs;
    return user;
  }
}
