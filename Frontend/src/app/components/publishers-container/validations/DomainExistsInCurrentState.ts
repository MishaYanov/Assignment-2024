import { AbstractControl, ValidatorFn } from "@angular/forms";
import { IDomain, IPublisher } from "../models";



/*
 * this function checks if domain exists in current state of all domains in order to avoid duplicates
 * and calling the server for the same domain
*/
export function DomainExistsInCurrentState(allDomains: IDomain[], allPublishers: IPublisher[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (!control.value)  return null; 
      
      const isDomainExists = allDomains.find(domain => domain.domain === control.value);
      return isDomainExists ? { domainExists: true, publisher: allPublishers.find(publisher => publisher.id === isDomainExists.publisherId)?.name } : null;
    };
  }