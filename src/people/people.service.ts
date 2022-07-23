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
    return await this.peopleRepository.update(id, updatePersonDto);
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
