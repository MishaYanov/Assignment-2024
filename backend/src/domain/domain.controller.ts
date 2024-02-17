import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { DomainService } from './domain.service';
import { IDomainDto, INewDomainDto } from './dto';
import { NewDomainValidationPipe, UpdateDomainValidationPipe } from './pipes';
import { verifyIdIntegrity } from './helpers/verifyIdIntegrity';

@Controller('domains')
export class DomainController {
    constructor(private publisherService: DomainService) {}


    @Get('all')
    public async getAllDomains() {
        return this.publisherService.getAllDomains();
    }

    @Post('add')
    public async createDomain(
        @Body(new NewDomainValidationPipe()) dto: INewDomainDto,
    ) {
        //had to build my own validation pipe for the domain.
        return this.publisherService.createDomain(dto);
    }

    @Put('/update/:id')
    public async updateDomain(
        @Body(new UpdateDomainValidationPipe()) dto: IDomainDto,
    ) {
        //while it is best practice to use class validators I decided to use my own validation.
        return this.publisherService.updateDomain(dto);
    }

    @Delete('/delete/:id')
    public async deleteDomain(@Param('id') id: string) {
        const numericId = verifyIdIntegrity(id);
        return this.publisherService.deleteDomain(numericId);
    }

}
