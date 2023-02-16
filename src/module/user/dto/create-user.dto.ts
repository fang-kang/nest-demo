import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名', default: 'admin' })
  @IsString({ message: '用户名必须是字符串' })
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  readonly userName: string;

  @ApiProperty({ description: '密码', default: 'admin123' })
  @IsString({ message: '密码必须是字符串' })
  @IsNotEmpty({
    message: '密码不能为空',
  })
  readonly password: string;

  @ApiPropertyOptional({ description: '手机号', default: '13210985135' })
  @IsOptional()
  readonly mobile?: string;

  @ApiPropertyOptional({ description: '邮箱' })
  @IsOptional()
  readonly email?: string;

  @ApiPropertyOptional({ description: '真实姓名' })
  @IsOptional()
  readonly realName?: string;
}
