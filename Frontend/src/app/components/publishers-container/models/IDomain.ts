import { INewDomain } from "./INewDomain";

export interface IDomain extends INewDomain {
    id: number;
    createdAt?: Date;
    updatedAt?: Date;
}