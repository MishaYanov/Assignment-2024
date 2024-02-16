import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { INewDomainDto } from "../dto";
import { verifyDomainNameIntegrity } from "../helpers/verifyDomainNameIntegrity";

/**
 * This pipe is used to validate the incoming request body for the createDomain function in the DomainController
 */
@Injectable()
export class NewDomainValidationPipe implements PipeTransform {
    transform(value: INewDomainDto) {
        
        if (value.domain === undefined || typeof value.domain !== 'string' || value.domain.length === 0) {
            throw new BadRequestException('Validation failed: domain is required and must be a string');
        }
        //check if valid domain name
        const newDomainValue = verifyDomainNameIntegrity(value.domain);
        if (newDomainValue === false) {
            throw new BadRequestException('Validation failed: domain is not a valid domain name');
        }
        if (value.desktopAds === undefined || typeof value.desktopAds !== 'number' || isNaN(value.desktopAds) || value.desktopAds < 0) {
            throw new BadRequestException('Validation failed: desktopAds is required and must be a number bigger than 0');
        }

        if (value.mobileAds === undefined || typeof value.mobileAds !== 'number' || isNaN(value.mobileAds) || value.mobileAds < 0) {
            throw new BadRequestException('Validation failed: mobileAds is required and must be a number bigger than 0');
        }
        if (value.publisherId === undefined || typeof value.publisherId !== 'number' || isNaN(value.publisherId) || value.publisherId < 0) {
            throw new BadRequestException('Validation failed: publisherId is required and must be a number bigger than 0');
        }
        //filter the request body and return only the domain, desktopAds and mobileAds properties
        return {
            domain: newDomainValue,
            desktopAds: value.desktopAds,
            mobileAds: value.mobileAds,
            publisherId: value.publisherId
        } as INewDomainDto;
    }

}