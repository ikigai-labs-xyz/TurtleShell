import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {map} from 'rxjs/operators';
import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class ChainbaseService{
    constructor(private chainbaseApiService: HttpService ){}
    public contractEvents(params){
        return this.chainbaseApiService
            .get(`https://api.chainbase.online/v1/contract/events?chain_id=${params.chain_id}&contract_address=${params.address}`)
            .pipe(
                map((response) => response.data)
            )
    }
}