import { Type } from 'class-transformer';
import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxDate,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePersonDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(14)
  identification: string;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([1, 2]) // 1 = Pessoa Física, 2 = Pessoa Jurídica
  type: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  @MaxDate(new Date())
  birthDate: Date;
}
