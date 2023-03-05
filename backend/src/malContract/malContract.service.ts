import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {map} from 'rxjs/operators';

@Injectable()
export class MalContractService{
    constructor(private goPlusService: HttpService ){}
    public maliciousContract(params){
        return this.goPlusService
            .get(`https://api.gopluslabs.io/api/v1/address_security/${params.address}?chain_id=${params.chainID}`)
            .pipe(
                map((response) => response.data)
            )
    }
}