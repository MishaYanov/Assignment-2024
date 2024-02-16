import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublisherListComponent } from './components/publisher-list/publisher-list.component';
import { LoadingPageComponent } from '../reuseables/loading-page/loading-page.component';
import { PublishersService } from './services/publishers.service';
import { DomainsService } from './services/domains.service';
import { SharedPublishersService } from './shared/shared-publishers.service';
import { IDomain, INewDomain, INewPublisher, IPublisher } from './models';
import { SharedDomainsService } from './shared/shared-domains.service';
import { PublisherDomainsComponent } from './components/publisher-domains/publisher-domains.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-publishers-container',
  standalone: true,
  imports: [CommonModule, PublisherListComponent, LoadingPageComponent, PublisherDomainsComponent],
  templateUrl: './publishers-container.component.html',
  styleUrl: './publishers-container.component.css',
})
export class PublishersContainerComponent implements OnInit {
  public isLoading = true;
  private subscriptions = new Subscription();

  constructor(
    private publisherService: PublishersService,
    private sharedPublishers: SharedPublishersService,
    private domainService: DomainsService,
    private sharedDomains: SharedDomainsService
  ) {}
  selectedPublisher: IPublisher | null = null;

  ngOnInit(): void {
    this.initView();

    this.subscribeToPublisherEvents();
    this.subscribeToDomainEvents();
  }

  initView(): void {
    this.getPublishers();
    this.getDomains();
  }

  // Subscriptions to events for publishers and domains
  subscribeToPublisherEvents(): void {
    this.subscriptions.add(this.sharedPublishers.publisherAdded$.subscribe(
      (newPublisher: INewPublisher) => {
        this.addPublisher(newPublisher);
      }
    ));
  };

  subscribeToDomainEvents(): void {
    this.subscriptions.add(this.sharedDomains.domainAdded$.subscribe(
      (newDomain: INewDomain) => {
        this.addDomain(newDomain);
      }
    ));

    this.subscriptions.add(this.sharedDomains.domainUpdated$.subscribe(
      (domain: IDomain) => {
        this.updateDomain(domain);
      }
    ));

    this.subscriptions.add(this.sharedDomains.domainDeleted$.subscribe(
      (domainId: number) => {
        this.deleteDomain(domainId);
      }
    ));
  };

  getPublishers(): void {
    const publishersObservable = this.publisherService.getAllPublishers();
    publishersObservable.subscribe((publishers: IPublisher[]) => {
      this.sharedPublishers.publishers = publishers;
      this.onDataLoaded();
    });
  }

  getDomains(): void {
    const domainsObservable = this.domainService.getAllDomains();
    domainsObservable.subscribe((domains: IDomain[]) => {
      this.sharedDomains.domains = domains;
      // this.onDataLoaded(); is required as the domain may load later than the publishers as main view don't depend on domains data
    });
  }

  addPublisher(newPublisher: INewPublisher): void {
    this.onDataLoading();
    this.publisherService.addPublisher(newPublisher).subscribe({
      next: (publisher:any) => {
        if(publisher.id) {
          this.onDataLoaded();
          //success message
        }
        // Update the publishers list, make a new request to get the updated list as it may have changed by other users
        this.getPublishers();
      },
      error: (error) => {
        this.onDataLoaded();
          //error message
        console.error('Failed to add new publisher', error);
      }
    });
  }

  addDomain(newDomain: INewDomain): void {
    this.onDataLoading();
    this.domainService.addDomain(newDomain).subscribe({
      next: (domain: any) => {
        if(domain.id) {
          this.onDataLoaded();
          //success message
        }
        // Update the domains list, make a new request to get the updated list as it may have changed by other users
        this.getDomains();
      },
      error: (error) => {
        this.onDataLoaded();
          //error message
        console.error('Failed to add new domain', error);
      }
    });
  };

  updateDomain(domain: IDomain): void {
    this.onDataLoading();
    this.domainService.updateDomain(domain).subscribe({
      next: (domain: any) => {
        if(domain.id) {
          this.onDataLoaded();
          //success message
        }
        // Update the domains list, make a new request to get the updated list as it may have changed by other users
        this.getDomains();
      },
      error: (error) => {
        this.onDataLoaded();
          //error message
        console.error('Failed to update domain', error);
      }
    });
  };

  deleteDomain(domainId: number): void {
    this.onDataLoading();
    this.domainService.deleteDomain(domainId).subscribe({
      next: (domain: any) => {
        if(domain.id) {
          this.onDataLoaded();
          //success message
        }
        // Update the domains list, make a new request to get the updated list as it may have changed by other users
        this.getDomains();
      },
      error: (error) => {
        this.onDataLoaded();
          //error message
        console.error('Failed to delete domain', error);
      }
    });
  };
  
  
  
  onDataLoading(): void {
    this.isLoading = true;
  }
  
  onDataLoaded(): void {
    this.isLoading = false;
  }

  onPublisherSelected(publisher: IPublisher): void {
    this.selectedPublisher = publisher;
  }
}
