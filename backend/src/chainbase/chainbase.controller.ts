import { Controller, Get, Param, UseFilters } from "@nestjs/common";
import {
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnprocessableEntityResponse,
  } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { ChainbaseService } from "./chainbase.service";

@Controller('chainbase')
@ApiTags('chainbase')
@UseFilters(HttpExceptionFilter)
export class ChainbaseController{
    constructor(private chainbaseService: ChainbaseService){
        
    }
    @Get('/:address/:chainID')
    @ApiOkResponse({ description: 'Contract events retrieved successfully.' })
    public contractEvents(@Param() params){
        return this.chainbaseService.contractEvents(params);
    }
}