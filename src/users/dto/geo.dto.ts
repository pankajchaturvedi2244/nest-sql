import { IsNotEmpty, IsNumber } from 'class-validator';

export class GeoDto {
  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  lng: number;
}
