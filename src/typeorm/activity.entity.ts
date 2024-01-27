import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'activity_id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  category: string;

  @Column({
    nullable: false,
    default: '',
  })
  lang: string;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    nullable: false,
    default: '',
  })
  description: string;

  @Column({
    nullable: false,
    default: '',
  })
  type: string;
  @Column({
    nullable: false,
    default: 0,
  })
  qualification: number;
}