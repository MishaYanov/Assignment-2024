import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


/**
 * This service is used to interact with the PrismaClient instance.
 * 
 * @returns The methods in this service return the data from the database.
 */
@Injectable()
export class PrismaService extends PrismaClient{
    constructor() {
        super();
    }

    
}
