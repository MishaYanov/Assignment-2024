import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { INewPublisherDto } from './dto';
import { NewPublisherValidationPipe } from './pipes/publisher-validation.pipe';

@Controller('publishers')
export class PublisherController {
  constructor(private publisherService: PublisherService) {}

  //this function if for creating a new publisher and it uses the NewPublisherValidationPipe to validate the incoming request body.
  @Post('add')
  public async createPublisher(
    @Body(new NewPublisherValidationPipe()) dto: INewPublisherDto,
  ) {
    //while it is best practice to use class validators I decided to use my own validation.
    return this.publisherService.createPublisher(dto);
  }

  //this function is for getting all publishers as required by the scope of the assignment.
  @Get('all')
  public async getAllPublishers() {
    return this.publisherService.getAllPublishers();
  }
}
