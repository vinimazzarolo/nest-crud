import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 150,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 14,
  })
  identification: string;

  @Column({ type: 'tinyint' })
  type: number;

  @Column({ type: 'date' })
  birthDate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;
}
