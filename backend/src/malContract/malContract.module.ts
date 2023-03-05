import {Module} from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';
import { MalContractController } from './malContract.controller';
import { MalContractService } from './malContract.service';

@Module({
    controllers: [MalContractController],
    providers: [MalContractService],
    imports: [HttpModule]
})
export class MalContractModule {}