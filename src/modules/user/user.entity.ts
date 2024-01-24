// user.model.ts
import { WrongPasswordEntity } from 'src/entities/WrongPasswordEntity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  fio: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => WrongPasswordEntity, (wp) => wp.user, { cascade: true })
  wrong_password: WrongPasswordEntity;
}
