import { AbstractControl, ValidatorFn } from '@angular/forms';

// this custom validator is built from the helper in the backend
export function verifyDomainNameIntegrityValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        // If there's no value, we consider it valid at this validation stage
        return null;
      }
      // Stripping protocol and www
      const strippedUrl = control.value.replace(/^(https?:\/\/)?(www\.)?/, '');
      // Domain/Subdomain.TLD validation regex
      const regex = /^(?!-)[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/;
      
      // Test the stripped domain name against the regex
      if (regex.test(strippedUrl)) {
        // If the domain name is valid, return null (no validation error)
        return null;
      } else {
        // If the domain name is invalid, return an error object
        return { 'invalidDomain': true };
      }
    };
  }