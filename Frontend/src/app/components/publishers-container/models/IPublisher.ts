import { INewPublisher } from "./";


export interface IPublisher extends INewPublisher{
    id: number;
    createdAt?: Date;
    updatedAt?: Date; 
}