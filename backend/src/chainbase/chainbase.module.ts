import {Module} from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';
import { ChainbaseController } from './chainbase.controller';
import { ChainbaseService } from './chainbase.service';

@Module({
    controllers: [ChainbaseController],
    providers: [ChainbaseService],
    imports: [HttpModule]
})
export class ChainbaseModule {}