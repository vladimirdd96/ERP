import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  profileid: number;
  @Column()
  fullname: string;
  @Column()
  bornon: Date;
}
