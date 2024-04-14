import { IsNotEmpty, IsString } from 'class-validator';

export class CompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  catchPhrase: string;

  @IsNotEmpty()
  @IsString()
  bs: string;
}
