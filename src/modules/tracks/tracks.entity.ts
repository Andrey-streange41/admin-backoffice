import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tracks')
export class TracksEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  text: string;

  @Column('varchar', { length: 255 })
  picture: string;

  @Column('varchar', { length: 255 })
  audio: string;

  @Column('int')
  listens: number;

  @Column('varchar', { length: 255 })
  title: string;
}
