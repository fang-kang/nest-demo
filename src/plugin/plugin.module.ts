import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';
import { ToolsService } from './tools/tools.service';
import { CollectApiModule } from './collect-api/collect-api.module';
import { IpToAddressService } from './ip-to-address/ip-to-address.service';

@Global()
@Module({
  providers: [LoggerService, ToolsService, IpToAddressService],
  exports: [LoggerService, ToolsService, IpToAddressService],
  imports: [CollectApiModule],
})
export class PluginModule {}
