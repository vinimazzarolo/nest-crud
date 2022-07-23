import { Person } from 'src/people/entities/person.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 9,
  })
  cep: string;

  @Column({ type: 'varchar' })
  street: string;

  @Column({ type: 'integer' })
  number: number;

  @Column({ type: 'varchar' })
  neighborhood: string;

  @Column({ type: 'varchar', nullable: true })
  complement: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar', length: 2 })
  state: string;

  @Column({ type: 'tinyint' })
  type: number;

  @ManyToOne((address) => Address, (address) => address.person, {
    onDelete: 'CASCADE',
  })
  person: Person;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;
}
