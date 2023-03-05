import { Controller, Get, Param, UseFilters } from "@nestjs/common";
import { MalContractService } from "./malContract.service";
import {
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnprocessableEntityResponse,
  } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../filters/http-exception.filter';

@Controller('malContract')
@ApiTags('malContract')
@UseFilters(HttpExceptionFilter)
export class MalContractController{
    constructor(private malContractService: MalContractService){
        
    }
    @Get('/:address/:chainID')
    @ApiOkResponse({ description: 'Malicious contract report retrieved successfully.' })
    public maliciousContract(@Param() params){
        return this.malContractService.maliciousContract(params);
    }
}