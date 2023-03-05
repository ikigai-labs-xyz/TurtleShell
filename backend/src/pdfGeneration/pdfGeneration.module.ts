import {Module} from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';
import { PdfGenerationController } from './pdfGeneration.controller';
import { PdfGenerationService } from './pdfGeneration.service';

@Module({
    controllers: [PdfGenerationController],
    providers: [PdfGenerationService],
    imports: [HttpModule]
})
export class PdfGenerationModule {}