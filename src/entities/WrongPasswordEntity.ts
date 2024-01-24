import { UserEntity } from 'src/modules/user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('wrong_password')
export class WrongPasswordEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('integer')
  user_id: number;

  @Column('tinyint', { default: 1 })
  amount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => UserEntity, (user) => user.wrong_password)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
