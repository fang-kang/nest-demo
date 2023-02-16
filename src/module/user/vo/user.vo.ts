import { ApiProperty } from '@nestjs/swagger';
import { QueryListVo } from '@src/common/vo/query.list.vo';
import { QueryVo } from '@src/common/vo/query.vo';

export class UserVo extends QueryVo {
  @ApiProperty({ description: '用户名' })
  userName: string;

  @ApiProperty({ description: '密码' })
  password: string;

  @ApiProperty({ description: '手机号' })
  mobile?: string;

  @ApiProperty({ description: '邮箱' })
  email?: string;

  @ApiProperty({ description: '真实姓名' })
  realName?: string;
}

export class UserListVo extends QueryListVo {
  @ApiProperty({ description: '返回数据列表', type: UserVo, isArray: true })
  data: UserVo[];
}
