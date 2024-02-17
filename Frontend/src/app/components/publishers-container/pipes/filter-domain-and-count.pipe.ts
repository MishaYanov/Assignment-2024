import { Pipe, PipeTransform } from '@angular/core';
import { IDomain } from '../models';

/**
 * 
 * FilterDomainAndCountPipe
 * 
 * This pipe is responsible for filtering the domains by the publisher id and returning the count of the domains.
 * used this pipe for an overview of the domains in the publisher domains list
 * 
 */
@Pipe({
  name: 'filterDomainAndCount',
  standalone: true
})
export class FilterDomainAndCountPipe implements PipeTransform {

  transform(domains: IDomain[], publisherId: number | undefined ): number {
    if (!domains || !publisherId) return 0;
    return domains.filter(domain => domain.publisherId === publisherId)?.length || 0;
  }

}
