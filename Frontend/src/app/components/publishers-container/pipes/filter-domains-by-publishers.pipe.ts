import { Pipe, PipeTransform } from '@angular/core';
import { IDomain } from '../models';

@Pipe({
  name: 'filterDomainsByPublishers',
  standalone: true
})
export class FilterDomainsByPublishersPipe implements PipeTransform {

  transform(domains: IDomain[], publisherId: number | undefined): IDomain[] {
    if (!domains || !publisherId) return [];
    return domains.filter(domain => domain.publisherId === publisherId);
  }

}
