import { StatusEnum } from '@src/common/enums';
import { SharedEntity } from '@src/shared/entities/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity('users')
export class UserEntity extends SharedEntity {
  @Index()
  @Column({
    type: 'varchar',
    name: 'user_name',
    nullable: false,
    comment: '用户名',
    length: 50,
  })
  userName: string;

  @Column({
    type: 'varchar',
    name: 'password',
    nullable: false,
    comment: '密码',
    length: 50,
  })
  password: string;

  @Index()
  @Column({
    type: 'varchar',
    nullable: true,
    length: 11,
    name: 'mobile',
    comment: '手机号码',
  })
  mobile: string;

  @Index()
  @Column({
    type: 'varchar',
    nullable: true,
    length: 50,
    name: 'email',
    comment: '邮箱',
  })
  email: string;

  @Column({
    type: 'enum',
    nullable: true,
    default: StatusEnum.Normal,
    name: 'status',
    comment: '状态,0表示禁止,1表示正常',
    enum: StatusEnum,
  })
  status: StatusEnum;

  @Column('varchar', {
    name: 'real_name',
    nullable: true,
    comment: '真实姓名',
    length: 20,
  })
  realName: string | null;
}
