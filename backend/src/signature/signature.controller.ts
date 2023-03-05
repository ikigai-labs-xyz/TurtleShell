import { Controller, Post, Param, UseFilters, Body } from '@nestjs/common';
import { SignatureService } from './signature.service';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { HttpExceptionFilter } from '../filters/http-exception.filter';

@Controller('signature')
@ApiTags('signature')
@UseFilters(HttpExceptionFilter)
export class SignatureController {
  constructor(private signatureService: SignatureService) {}
  @Post('')
  @ApiOkResponse({
    description: 'Created Signature succesfully.',
  })
  public async composeSignature(@Body() params) {
    return await this.signatureService.composeSignature(params);
  }
}
