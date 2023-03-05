import {Module} from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';
import { ApiKeysController } from './apiKeys.controller';

@Module({
    controllers: [ApiKeysController],
})
export class ApiKeysModule {}