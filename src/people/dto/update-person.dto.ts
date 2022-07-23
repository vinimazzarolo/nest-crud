import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonDto } from './create-person.dto';
import { IsOptional } from 'class-validator';

export class UpdatePersonDto extends PartialType(CreatePersonDto) {
  @IsOptional()
  name: string;

  @IsOptional()
  identification: string;

  @IsOptional()
  type: number;

  @IsOptional()
  birthDate: Date;
}
