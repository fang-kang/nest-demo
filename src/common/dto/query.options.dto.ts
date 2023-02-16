import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QueryOptionsDto {
  @ApiPropertyOptional({ description: '一页显示多少条', default: 10 })
  @IsOptional()
  readonly pageSize?: number;

  @ApiPropertyOptional({ description: '当前页', default: 1 })
  @IsOptional()
  readonly pageNumber?: number;
}
