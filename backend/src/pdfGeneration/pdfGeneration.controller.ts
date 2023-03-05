import { Controller, Get, Param, UseFilters } from "@nestjs/common";
import { PdfGenerationService } from "./pdfGeneration.service";
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
export class PdfGenerationController{
    constructor(private pdfGenerationService: PdfGenerationService){
        
    }
    @Get('/:address/:chainID')
    @ApiOkResponse({ description: 'Malicious contract report retrieved successfully.' })
    public maliciousContract(@Param() params){
        return this.pdfGenerationService.maliciousContract(params);
    }
}