import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IDomainDto, INewDomainDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class DomainService {

    constructor(private prisma:PrismaService) {}

   

    public async getAllDomains() {
        const domains = await this.prisma.domain.findMany();
        return domains as IDomainDto[];
    }

    public async createDomain(dto: INewDomainDto) {
        // save the domain to the database
        try{
            const newDomain = await this.prisma.domain.create({
                data: {
                    domain: dto.domain,
                    desktopAds: dto.desktopAds,
                    mobileAds: dto.mobileAds,
                    publisherId: dto.publisherId,
                }
            });
            return newDomain;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                  throw new ForbiddenException('Domain already exists');
                }
              }
              throw error;
        }
    }

    public async updateDomain(dto: IDomainDto) {
        try {
            // Check if the new domain name already exists for a different ID in the database
            const existingDomain = await this.prisma.domain.findFirst({
                where: {
                    domain: dto.domain,
                    NOT: {
                        id: dto.id,
                    },
                },
            });
            if (existingDomain) {
                throw new ForbiddenException('Domain already exists with a different ID.');
            }
            // if the domain name does not exist then update the domain
            const updatedDomain = await this.prisma.domain.update({
                where: {
                    id: dto.id,
                },
                data: {
                    domain: dto.domain,
                    desktopAds: dto.desktopAds,
                    mobileAds: dto.mobileAds,
                },
            });
            return updatedDomain;
        } catch (error) {
            //while i couldn't find a case where this would happen I am still going to check for it as a possible edge case.
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Domain already exists');
                }
                // edge case when one tries to update a domain that was deleted
                if(error.code === 'P2025'){
                    throw new NotFoundException(`Domain with ID ${dto.id} not found`);
                }
            }
            throw error;
        }
    }

    public async deleteDomain(id: number) {
        try {
            const deletedDomain = await this.prisma.domain.delete({
                where: {
                    id: id,
                },
            });
            return deletedDomain;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`Domain with ID ${id} not found`);
            } else {
                throw error;
            }
        }
    }
    
}
