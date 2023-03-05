import {Module} from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';
import { EtherscanController } from './etherscan.controller';
import { EtherscanService } from './etherscan.service';

@Module({
    controllers: [EtherscanController],
    providers: [EtherscanService],
    imports: [HttpModule]
})
export class EtherscanModule {}