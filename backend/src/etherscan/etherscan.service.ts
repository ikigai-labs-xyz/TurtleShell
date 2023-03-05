import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {map} from 'rxjs/operators';
import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class EtherscanService{
    constructor(private etherscanApiService: HttpService ){}
    public contractByAddress(params){
        return this.etherscanApiService
            .get(`https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${params.address}&apikey=${process.env.ETHERSCAN_API_KEY}`)
            .pipe(
                map((response) => response.data)
            )
    }
}