import { AddressDto } from '@app/common/dtos/address.dto';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { CompanyDto } from '../dto/company.dto';
import { GeoDto } from '../dto/geo.dto';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((item) => this.transformItem(item));
        } else {
          return this.transformItem(data);
        }
      }),
    );
  }
  private parseUserEntityToDto(user: User): CreateUserDto {
    const addressDto = plainToClass(AddressDto, {
      street: user.street,
      suite: user.suite,
      city: user.city,
      zipcode: user.zipcode,
      geo: plainToClass(GeoDto, {
        lat: user.lat,
        lng: user.lng,
      }),
    });

    const companyDto = plainToClass(CompanyDto, {
      name: user.company,
      catchPhrase: user.catchPhrase,
      bs: user.bs,
    });

    return plainToClass(CreateUserDto, {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      address: addressDto,
      phone: user.phone,
      website: user.website,
      company: companyDto,
    });
  }

  private transformItem(item: User): any {
    const transformedItem = this.parseUserEntityToDto(item);
    return transformedItem;
  }
}
