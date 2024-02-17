import { Component, Input, SimpleChanges } from '@angular/core';
import { IDomain, IPublisher } from '../../models';
import { SharedDomainsService } from '../../shared/shared-domains.service';
import { FilterDomainsByPublishersPipe } from '../../pipes/filter-domains-by-publishers.pipe';
import { CommonModule } from '@angular/common';
import { NewDomainFormComponent } from '../forms/new-domain-form/new-domain-form.component';
import { DomainCardComponent } from './domain-card/domain-card.component';
import { FilterDomainAndCountPipe } from '../../pipes/filter-domain-and-count.pipe';

/**
 * 
 * PublisherDomainsComponent
 * 
 * This component is responsible for displaying the domains of the selected publisher.
 * In this assignment I decide to to make an additional http to get domains by publisher id and filter them in the front end.
 * As the verifications are done both on the front end and the back end, I decided to go with this approach to reduce the load on the server. 
 * 
 */

@Component({
  selector: 'app-publisher-domains',
  standalone: true,
  imports: [FilterDomainsByPublishersPipe, CommonModule, NewDomainFormComponent, DomainCardComponent, FilterDomainAndCountPipe],
  templateUrl: './publisher-domains.component.html',
  styleUrl: './publisher-domains.component.css',
})
export class PublisherDomainsComponent {
  
  @Input() selectedPublisher: IPublisher | null = null;
  
  isPublisherSelected = false;
  isNewDomainFormVisible = false;
  AllDomains: IDomain[] = [];


  constructor(
    private sharedDomains: SharedDomainsService
  ) {}

  ngOnInit(): void {
    this.sharedDomains.domainsObservable.subscribe((domains: IDomain[]) => {
      this.AllDomains = domains;
    });
  }

  toggleDomainAdditionForm(): void {
    this.isNewDomainFormVisible = !this.isNewDomainFormVisible;
  };
}
