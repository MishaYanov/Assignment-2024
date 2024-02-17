import { Pipe, PipeTransform } from '@angular/core';
import { IDomain } from '../models';

/**
 * FilterDomainsByPublishersPipe
 * 
 * This pipe is responsible for filtering the domains by the publisher id.
 * invoked in the domain list when selecting a publisher
 * 
 */

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
