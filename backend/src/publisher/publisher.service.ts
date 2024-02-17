import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { INewPublisherDto, IPublisherDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

/**
 * This service is used to interact with the Publisher table in the database.
 * It contains methods for creating a new publisher and getting all publishers.
 * 
 * @param prisma This is the PrismaService instance that is used to interact with the database.
 * 
 * @returns The methods in this service return the data from the database.
 */

@Injectable()
export class PublisherService {
  constructor(private prisma: PrismaService) {}

  public async createPublisher(dto: INewPublisherDto) {
    //save the user to the database
    try {
      const NewPublisher = await this.prisma.publisher.create({
        data: {
          name: dto.name,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      return NewPublisher;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Publisher already exists');
        }
      }
      throw error;
    }
  }

  public async getAllPublishers() {
    //get all publishers from the database
    const allPublishers = await this.prisma.publisher.findMany();
    return allPublishers as IPublisherDto[];
  }
}
