import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PeopleRepository {
  constructor(
    @InjectRepository(Person) private personRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto): Promise<number> {
    const person = new Person();

    person.name = createPersonDto.name;
    person.identification = createPersonDto.identification;
    person.type = createPersonDto.type;
    person.birthDate = createPersonDto.birthDate;

    await this.personRepository.save(person);

    return person.id;
  }

  findAll() {
    return `This action returns all people`;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  async update(
    id: number,
    updatePersonDto: UpdatePersonDto,
  ): Promise<string | Person> {
    const person = await this.personRepository.findOneBy({ id });

    if (!person) {
      return 'Pessoa não encontrada.';
    }

    person.name = updatePersonDto.name;
    person.identification = updatePersonDto.identification;
    person.type = updatePersonDto.type;
    person.birthDate = updatePersonDto.birthDate;
    person.updatedAt = new Date();

    await this.personRepository.save(person);

    return person;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
