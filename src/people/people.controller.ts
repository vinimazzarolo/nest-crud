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
import { Person } from './entities/person.entity';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  async create(@Body() createPersonDto: CreatePersonDto): Promise<number> {
    return await this.peopleService.create(createPersonDto);
  }

  @Get()
  async findAll(): Promise<Person[]> {
    return await this.peopleService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: FindPersonDto): Promise<string | Person> {
    return await this.peopleService.findOne(+params.id);
  }

  @Put(':id')
  async update(
    @Param() params: FindPersonDto,
    @Body() updatePersonDto: UpdatePersonDto,
  ): Promise<string | Person> {
    return await this.peopleService.update(+params.id, updatePersonDto);
  }

  @Delete(':id')
  async remove(@Param() params: FindPersonDto): Promise<string | Person> {
    return await this.peopleService.remove(+params.id);
  }
}
