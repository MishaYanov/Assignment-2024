import { AbstractControl, ValidatorFn } from '@angular/forms';

// this custom validator is built from the helper in the backend
export function verifyDomainNameIntegrityValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      // Stripping protocol and www
      const strippedUrl = control.value.replace(/^(https?:\/\/)?(www\.)?/, '');
      // Domain/Subdomain.TLD validation regex
      const regex = /^(?!-)[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/;
      if (regex.test(strippedUrl)) {
        return null;
      } else {
        return { 'invalidDomain': true };
      }
    };
  }