// import { Controller, Get, Param, UseFilters } from "@nestjs/common";
// import { EtherscanService} from "./covalent.service";
// import {
//     ApiCreatedResponse,
//     ApiNotFoundResponse,
//     ApiOkResponse,
//     ApiTags,
//     ApiUnprocessableEntityResponse,
//   } from '@nestjs/swagger';
// import { HttpExceptionFilter } from '../filters/http-exception.filter';

// @Controller('etherscan')
// @ApiTags('etherscan')
// @UseFilters(HttpExceptionFilter)
// export class EtherscanController{
//     constructor(private etherscanService: EtherscanService){
        
//     }
//     @Get('/:address')
//     @ApiOkResponse({ description: 'Verified Contract source code retrieved successfully.' })
//     public contractByAddress(@Param() params){
//         return this.etherscanService.contractByAddress(params);
//     }
// }