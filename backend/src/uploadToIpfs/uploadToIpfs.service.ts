import { HttpService } from '@nestjs/axios';
import { Injectable, Inject } from '@nestjs/common';
import pinataSDK from '@pinata/sdk';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

@Injectable()
export class IpfsService {
  private readonly badgeFileName = 'nft-badge.html';
  private pinata: any;

  constructor() {
    this.pinata = new pinataSDK(
      process.env.PINATA_API_KEY,
      process.env.PINATA_SECRET_API_KEY,
    );
  }

  private getSVGData(auditDetails: any) {
    const rawSvgPath = path.resolve('svg', 'audit-badge.html');
    const rawBadgeContent = fs.readFileSync(rawSvgPath, { encoding: 'utf8' });

    let badgeSvgContent = rawBadgeContent;
    badgeSvgContent = badgeSvgContent.replace(
      '{TOKEN_ID}',
      auditDetails.tokenId,
    );
    badgeSvgContent = badgeSvgContent.replace(
      '{PROTOCOL_NAME}',
      auditDetails.protocolName,
    );
    badgeSvgContent = badgeSvgContent.replace(
      '{RISK_LEVEL}',
      auditDetails.riskLevel,
    );
    badgeSvgContent = badgeSvgContent.replace(
      '{TIMESTAMP}',
      auditDetails.timestamp,
    );
    badgeSvgContent = badgeSvgContent.replace(
      '{NETWORK}',
      auditDetails.networkName,
    );
    badgeSvgContent = badgeSvgContent.replace(
      '{CONTRACT_ADDRESS}',
      auditDetails.contractAddr,
    );
    badgeSvgContent = badgeSvgContent.replace(
      '{CRITICAL_VULNERABILITIES}',
      auditDetails.critVul,
    );
    badgeSvgContent = badgeSvgContent.replace(
      '{HIGH_VULNERABILITIES}',
      auditDetails.highVul,
    );
    badgeSvgContent = badgeSvgContent.replace(
      '{MEDIUM_VULNERABILITIES}',
      auditDetails.medVul,
    );
    badgeSvgContent = badgeSvgContent.replace(
      '{LOW_VULNERABILITIES}',
      auditDetails.lowVul,
    );

    return badgeSvgContent;
  }

  private async uploadNftMetada(auditDetails, response) {
    const tempFilePath = path.resolve('svg', 'tempMetadata');

    const metadata = {
      name: `TurtleShell-Audit (ID:${String(auditDetails.tokenId)}, Name: ${
        auditDetails.protocolName
      }, ContractAddress: ${auditDetails.contractAddr})`,
      description:
        'TurtleShell-NFTs are soul-bound audit badges for Smart Contracts',
      image: 'ipfs://' + response.IpfsHash + '/' + this.badgeFileName,
    };

    fs.writeFileSync(tempFilePath, JSON.stringify(metadata));
    const readableStreamForFile = fs.createReadStream(tempFilePath);

    const options = {
      pinataMetadata: {
        name: auditDetails.contractAddr + ' - NFT metadata',
      },
    };

    let ipfsHash;
    try {
      const res = await this.pinata.pinFileToIPFS(
        readableStreamForFile,
        options,
      );
      ipfsHash = res.IpfsHash;
    } catch (e) {
      console.log(e);
    }

    fs.unlinkSync(tempFilePath);
    return ipfsHash;
  }

  private async uploadSVGToPinata(auditDetails) {
    const directory = path.resolve('svg');
    const tempDirectoryName = 'svgUpload';
    const uploadFolderPath = path.resolve(directory, tempDirectoryName);
    const tempSVGFilePath = path.resolve(uploadFolderPath, this.badgeFileName);

    fs.writeFileSync(tempSVGFilePath, this.getSVGData(auditDetails));

    const options = {
      pinataMetadata: {
        name: `${auditDetails.contractAddr} - svg`,
      },
    };

    let response;
    try {
      response = await this.pinata.pinFromFS(uploadFolderPath, options);
    } catch (e) {
      console.log(e);
    }

    fs.unlinkSync(tempSVGFilePath);

    return response;
  }

  private async pinSVG(auditDetails) {
    const response = await this.uploadSVGToPinata(auditDetails);
    return await this.uploadNftMetada(auditDetails, response);
  }

  public async uploadToIpfs(body: any) {
    const timestamp = Math.floor(Date.now() / 1000);

    // data returned from the AI model
    // const auditDetails = {
    //   protocolName: "",
    //   tokenId: 0,
    //   networkName: "GOERLI",
    //   contractAddr: "randomAddr",
    //   critVul: 0,
    //   highVul: 0,
    //   medVul: 0,
    //   lowVul: 0,
    //   timestamp: timestamp,
    // }

    return this.pinSVG(body);
  }
}
