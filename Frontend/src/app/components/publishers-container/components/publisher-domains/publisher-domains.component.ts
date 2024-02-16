import { Component, Input, SimpleChanges } from '@angular/core';
import { IDomain, IPublisher } from '../../models';
import { SharedDomainsService } from '../../shared/shared-domains.service';
import { FilterDomainsByPublishersPipe } from '../../pipes/filter-domains-by-publishers.pipe';
import { CommonModule } from '@angular/common';
import { NewDomainFormComponent } from '../forms/new-domain-form/new-domain-form.component';
import { DomainCardComponent } from './domain-card/domain-card.component';

@Component({
  selector: 'app-publisher-domains',
  standalone: true,
  imports: [FilterDomainsByPublishersPipe, CommonModule, NewDomainFormComponent, DomainCardComponent],
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
