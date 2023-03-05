import { Controller, Get } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config()

@Controller('api-keys')
export class ApiKeysController {
  constructor() {}

  @Get()
  getApiKeys() {
    const etherscanApiKey = process.env.ETHERSCAN_API_KEY;
    const covalentApiKey = process.env.COVALENT_API;
    const alchemyApiKey = process.env.ALCHEMY_API_KEY;

    return { etherscanApiKey, covalentApiKey, alchemyApiKey };
  }
}
