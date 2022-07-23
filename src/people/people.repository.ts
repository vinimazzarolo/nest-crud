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

  async findAll(): Promise<Person[]> {
    return this.personRepository.find();
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

  async remove(id: number): Promise<string> {
    const person = await this.personRepository.findOneBy({ id });

    if (!person) {
      return 'Pessoa não encontrada.';
    }

    const message = `A pessoa ID: ${person.id}, Nome: ${person.name} foi removida.`;

    await this.personRepository.remove(person);

    return message;
  }
}
