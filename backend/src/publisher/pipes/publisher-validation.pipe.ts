import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { INewPublisherDto } from '../dto';

/*
    This pipe is used to validate the incoming request body for the createPublisher method in the PublisherService. 
    It checks if the request body has a name property and if the name property is a string. 
    If the request body does not have a name property or if the name property is not a string, 
    it throws a BadRequestException with a message indicating the validation error.
*/
@Injectable()
export class NewPublisherValidationPipe implements PipeTransform {
  transform(value: INewPublisherDto) {
    if (!value.name || typeof value.name !== 'string') {
      throw new BadRequestException('Validation failed: name is required and must be a string');
    }

    //I want to return only the name property of the request body to 
    return {name: value.name} as INewPublisherDto;
  }
}
