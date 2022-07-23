import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  @Length(9)
  cep: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsNumber()
  number: number;

  @IsNotEmpty()
  @IsString()
  neighbourhood: string;

  @IsOptional()
  @IsString()
  complement: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  @Length(2)
  state: string;

  @IsNotEmpty()
  @IsNumber()
  type: number; // 1 = Residencial, 2 = Comercial
}
