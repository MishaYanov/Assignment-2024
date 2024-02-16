import { AbstractControl, ValidatorFn } from "@angular/forms";
import { IDomain } from "../../models";



/*
 * this function checks if domain exists in current state of all domains in order to avoid duplicates
 * and calling the server for the same domain
*/
export function DomainExistsInCurrentState(allDomains: IDomain[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (!control.value)  return null; 
      
      const isDomainExists = allDomains.some(domain => domain.domain === control.value);
      return isDomainExists ? { domainExists: true } : null;
    };
  }