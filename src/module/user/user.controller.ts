import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, Delete, Patch, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserListVo, UserVo } from './vo/user.vo';
import { UserReqDto } from './dto/user.req.dto';

@Controller('user')
@ApiTags('用户')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '创建账号',
  })
  @Post('add')
  @HttpCode(HttpStatus.OK)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @ApiOperation({
    summary: '查询所有创建账号',
  })
  @HttpCode(HttpStatus.OK)
  @Get('findAll')
  async findAll(): Promise<UserVo[]> {
    return await this.userService.findAll();
  }

  @ApiOperation({
    summary: '获取创建账号',
    description: '分页获取创建账号',
    externalDocs: {
      url: 'xxx?pageSize=10&pageNumber=1',
    },
  })
  @Get('findListPage')
  async accessListPage(@Query() userReqDto: UserReqDto): Promise<UserListVo> {
    return await this.userService.findListPage(userReqDto);
  }

  @ApiOperation({
    summary: '根据id获取用户信息',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserVo> {
    return await this.userService.findOne(+id);
  }

  @ApiOperation({
    summary: '根据id更新用户信息',
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({
    summary: '根据id删除用户信息',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }
}
