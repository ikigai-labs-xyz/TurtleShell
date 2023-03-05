import { Module } from '@nestjs/common';
import { MalContractModule } from './malContract/malContract.module';
import { EtherscanModule } from './etherscan/etherscan.module';
import { ChainbaseModule } from './chainbase/chainbase.module';
import { UploadToIpfsModule } from './uploadToIpfs/uploadToIpfs.module';
import { ApiKeysModule } from './apiKeys/apiKeys.module';
import { SignatureModule } from './signature/signature.module';

@Module({
  imports: [MalContractModule, EtherscanModule, ChainbaseModule, UploadToIpfsModule, ApiKeysModule, SignatureModule],
})
export class AppModule {}
