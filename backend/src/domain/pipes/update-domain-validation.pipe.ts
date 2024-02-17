import { BadRequestException, Injectable } from "@nestjs/common";
import { IDomainDto } from "../dto";
import { verifyDomainNameIntegrity } from "../helpers/verifyDomainNameIntegrity";


@Injectable()
export class UpdateDomainValidationPipe {
    transform(value: IDomainDto) {
        if(value.domain === undefined || typeof value.domain !== 'string') {
            throw new BadRequestException('Validation failed: domain is required and must be a string')
        }
        const newDomainValue = verifyDomainNameIntegrity(value.domain);
        if (newDomainValue === false) {
            throw new BadRequestException('Validation failed: domain is not a valid domain name');
        }
        if(value.desktopAds === undefined || typeof value.desktopAds !== 'number' || isNaN(value.desktopAds) || value.desktopAds < 0) {
            throw new BadRequestException('Validation failed: desktopAds is required and must be a number bigger than 0')
        }
        if(value.mobileAds === undefined || typeof value.mobileAds !== 'number' || isNaN(value.mobileAds) || value.mobileAds < 0) {
            throw new BadRequestException('Validation failed: mobileAds is required and must be a number bigger than 0')
        }
        if(value.id === undefined || isNaN(value.id)){
            throw new BadRequestException('Validation failed: no id so this domain cannot be updated')
        }
        if(value.publisherId === undefined || isNaN(value.publisherId)){
            throw new BadRequestException('Validation failed: no publisherId so this domain cannot be updated')
        }
        
        return {
            domain: newDomainValue,
            desktopAds: value.desktopAds,
            mobileAds: value.mobileAds,
            id: value.id,
        } as IDomainDto;
    }
}