import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class SignatureService {
  private defaultProvider: ethers.providers.BaseProvider;
  private customWallet: ethers.Wallet;
  constructor(private signatureApiService: HttpService) {
    this.defaultProvider = ethers.getDefaultProvider('mainnet');
    this.customWallet = new ethers.Wallet(
      process.env.DEPLOYER_PRIVATE_KEY,
      this.defaultProvider,
    );
  }
  public async composeSignature(params) {
    const domain = {
      name: 'TurtleShellToken',
      version: '1',
      chainId: params.chainId,
      verifyingContract: '0xeb0c89B065Cf1a498A4B677a04Bb69EBdD641047',
    };

    const mintRequestTypes = {
      MintRequest: [
        { name: 'to', type: 'address' },
        { name: 'tokenURI', type: 'string' },
      ],
    };

    const mintRequest = {
      to: params.contractAddress,
      tokenURI: params.ipfsHash,
    };

    let signature;
    try {
      signature = await this.customWallet._signTypedData(
        domain,
        mintRequestTypes,
        mintRequest,
      );
    } catch (e) {
      console.log(e);
    }

    return signature;
  }
}
