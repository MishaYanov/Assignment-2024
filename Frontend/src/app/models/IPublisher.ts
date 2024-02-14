import { IDomain } from './IDomain';
export interface IPublisher {
    publisher: string;
    domains: Array<IDomain>;
}