import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { FindPersonDto } from './dto/find-person-dto';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.peopleService.create(createPersonDto);
  }

  @Get()
  findAll() {
    return this.peopleService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindPersonDto) {
    return this.peopleService.findOne(+params.id);
  }

  @Put(':id')
  update(
    @Param() params: FindPersonDto,
    @Body() updatePersonDto: UpdatePersonDto,
  ) {
    return this.peopleService.update(+params.id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param() params: FindPersonDto) {
    return this.peopleService.remove(+params.id);
  }
}
