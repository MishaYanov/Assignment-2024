import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { INewPublisherDto, IPublisherDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
