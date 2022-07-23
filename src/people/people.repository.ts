import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/addresses/entities/address.entity';
import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PeopleRepository {
  constructor(
    @InjectRepository(Person) private personRepository: Repository<Person>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
  ) {}

  async create(createPersonDto: CreatePersonDto): Promise<number> {
    const person = new Person();
    person.name = createPersonDto.name;
    person.identification = createPersonDto.identification;
    person.type = createPersonDto.type;
    person.birthDate = createPersonDto.birthDate;
    await this.personRepository.save(person);

    createPersonDto.addresses.forEach(async (personAddress) => {
      const address = new Address();
      address.cep = personAddress.cep;
      address.street = personAddress.street;
      address.number = personAddress.number;
      address.neighborhood = personAddress.neighbourhood;
      address.complement = personAddress.complement;
      address.city = personAddress.city;
      address.state = personAddress.state;
      address.type = personAddress.type;
      address.person = person;
      await this.addressRepository.save(address);
    });

    return person.id;
  }

  async findAll(): Promise<Person[]> {
    return this.personRepository.find({ relations: ['addresses'] });
  }

  async findOne(id: number): Promise<string | Person> {
    const person = await this.personRepository.findOne({
      where: { id },
      relations: ['addresses'],
    });

    if (!person) {
      throw new HttpException(
        { message: 'Pessoa não encontrada' },
        HttpStatus.NOT_FOUND,
      );
    }

    return person;
  }

  async update(
    id: number,
    updatePersonDto: UpdatePersonDto,
  ): Promise<string | Person> {
    const person = await this.personRepository.findOne({
      where: { id },
      relations: ['addresses'],
    });

    if (!person) {
      throw new HttpException(
        { message: 'Pessoa não encontrada' },
        HttpStatus.NOT_FOUND,
      );
    }

    person.name = updatePersonDto.name;
    person.identification = updatePersonDto.identification;
    person.type = updatePersonDto.type;
    person.birthDate = updatePersonDto.birthDate;
    person.updatedAt = new Date();
    await this.personRepository.save(person);

    updatePersonDto.addresses.forEach(async (personAddress) => {
      const requestId = personAddress.id;

      if (!requestId) {
        return false;
      }

      const address = await this.addressRepository.findOneBy({ id: requestId });

      if (!address) {
        return false;
      }

      address.cep = personAddress.cep;
      address.street = personAddress.street;
      address.number = personAddress.number;
      address.neighborhood = personAddress.neighbourhood;
      address.complement = personAddress.complement;
      address.city = personAddress.city;
      address.state = personAddress.state;
      address.type = personAddress.type;
      address.person = person;
      await this.addressRepository.save(address);
    });

    return person;
  }

  async remove(id: number): Promise<string> {
    const person = await this.personRepository.findOne({
      where: { id },
      relations: ['addresses'],
    });

    if (!person) {
      throw new HttpException(
        { message: 'Pessoa não encontrada' },
        HttpStatus.NOT_FOUND,
      );
    }

    const message = `A pessoa ID: ${person.id}, Nome: ${person.name} foi removida.`;

    await this.personRepository.remove(person);
    await this.addressRepository.remove(person.addresses);

    return message;
  }
}
