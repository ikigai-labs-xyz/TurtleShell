import { Controller, Get, Param, UseFilters, Body } from "@nestjs/common";
import { IpfsService } from "./uploadToIpfs.service";
import {
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnprocessableEntityResponse,
  } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../filters/http-exception.filter';

@Controller('uploadToIpfs')
@ApiTags('uploadToIpfs')
@UseFilters(HttpExceptionFilter)
export class UploadToIpfsController{
    constructor(private pinataService: IpfsService){
        
    }
    @Get()
    public uploadSvgToIpfs(@Body() body: any){
        return this.pinataService.uploadToIpfs(body);
    }
}