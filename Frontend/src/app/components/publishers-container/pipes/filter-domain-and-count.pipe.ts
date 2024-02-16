import { Pipe, PipeTransform } from '@angular/core';
import { IDomain } from '../models';

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
