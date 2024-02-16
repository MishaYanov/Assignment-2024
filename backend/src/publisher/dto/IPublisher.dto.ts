import { INewPublisherDto } from "./INewPublisher.dto";

export interface IPublisherDto extends INewPublisherDto{
    id: number;
    createdAt?: Date;
    updatedAt?: Date; //kinda redundant but I want to keep the same structure for all DTOs
}