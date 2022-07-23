import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PeopleRepository {
  constructor(private readonly dataSource: DataSource) {}

  async create(createPersonDto: CreatePersonDto): Promise<string> {
    const person = new Person();

    person.name = createPersonDto.name;
    person.identification = createPersonDto.identification;
    person.type = createPersonDto.type;
    person.birthDate = createPersonDto.birthDate;

    await this.dataSource.manager.save(person);
    console.log(`Person has been saved: ${person.id}`);
    return 'lol';
  }

  findAll() {
    return `This action returns all people`;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
