import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import { PeopleRepository } from './people.repository';

@Injectable()
export class PeopleService {
  constructor(private readonly peopleRepository: PeopleRepository) {}

  async create(createPersonDto: CreatePersonDto): Promise<number> {
    return await this.peopleRepository.create(createPersonDto);
  }

  async findAll(): Promise<Person[]> {
    return await this.peopleRepository.findAll();
  }

  async findOne(id: number): Promise<string | Person> {
    return await this.peopleRepository.findOne(id);
  }

  async update(
    id: number,
    updatePersonDto: UpdatePersonDto,
  ): Promise<string | Person> {
    return await this.peopleRepository.update(id, updatePersonDto);
  }

  async remove(id: number): Promise<string> {
    return await this.peopleRepository.remove(id);
  }
}
