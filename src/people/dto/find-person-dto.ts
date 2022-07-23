import { IsNotEmpty, IsNumberString } from 'class-validator';

export class FindPersonDto {
  @IsNotEmpty()
  @IsNumberString()
  id: number;
}
