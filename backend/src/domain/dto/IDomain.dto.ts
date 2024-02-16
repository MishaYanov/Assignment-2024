import { INewDomainDto } from "./";

export interface IDomainDto extends INewDomainDto {
    id: number;
    createdAt?: Date;
    updatedAt?: Date;
}