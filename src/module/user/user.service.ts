import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageEnum } from '@src/common/enums';
import { CustomException } from '@src/common/exceptions';
import { getConnection, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserReqDto } from './dto/user.req.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { userName, email, mobile } = createUserDto;
    const queryConditionList = [];
    if (userName) {
      queryConditionList.push('user.userName = :userName');
    }
    if (email) {
      queryConditionList.push('user.email = :email');
    }
    if (mobile) {
      queryConditionList.push('user.mobile = :mobile');
    }
    const queryCondition = queryConditionList.join(' OR ');
    const findUser: Pick<UserEntity, 'userName' | 'email' | 'mobile'> | undefined = await getConnection()
      .createQueryBuilder(UserEntity, 'user')
      .select(['user.userName', 'user.email', 'user.mobile'])
      .andWhere(queryCondition, { userName, email, mobile })
      .getOne();
    if (findUser) {
      if (userName === findUser.userName) {
        throw new CustomException('创建失败,已经存在该用户名');
      } else if (mobile === findUser.mobile) {
        throw new CustomException('创建失败,已经存在该手机号码');
      } else if (email === findUser.email) {
        throw new CustomException('创建失败,已经存在该邮箱号');
      } else {
        throw new CustomException('创建失败');
      }
    } else {
      const user: UserEntity = this.userRepository.create({
        ...createUserDto,
      });
      await this.userRepository.save(user);
    }
  }

  async findListPage(userReqDto: UserReqDto) {
    const { pageSize = PageEnum.PageSize, pageNumber = PageEnum.PageNumber } = userReqDto;
    const [data, total] = await getConnection()
      .createQueryBuilder(UserEntity, 'user')
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .orderBy({ 'user.created_at': 'DESC' })
      .printSql()
      .getManyAndCount();
    return {
      data,
      total,
      pageNumber,
      pageSize,
    };
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const data = await this.findUserById(id);
    return data;
  }

  private async findUserById(id: number): Promise<UserEntity | undefined> {
    const data = await this.userRepository.findOne(id);
    if (!data) {
      throw new CustomException('暂无该用户');
    }
    return data;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findUserById(id);
    return await this.userRepository.update(id, updateUserDto).then(() => {
      return updateUserDto;
    });
  }

  async remove(id: number) {
    const data = await this.findUserById(id);
    if (data) {
      return this.userRepository.delete(id).then(() => true);
    }
  }
}
