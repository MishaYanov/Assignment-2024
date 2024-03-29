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
import { notify } from 'easy-notify-vanilla';
import { invokeNotification } from '../reuseables/notifications';

/**
 * PublishersContainerComponent
 * This is the main component for the publishers view. It is responsible for loading the publishers and domains data and passing it to the child components.
 * I decided to make all the requests to the server in this component and pass the data to the child components as it is the main view and it is responsible for the data.
 * This way I bundle all the requests in one place and I can easily manage the data and the state of the view.
 * 
 */

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

  // Subscriptions to events for publishers 
  subscribeToPublisherEvents(): void {
    this.subscriptions.add(this.sharedPublishers.publisherAdded$.subscribe(
      (newPublisher: INewPublisher) => {
        this.addPublisher(newPublisher);
      }
    ));
  };

  // Subscriptions to events for domains
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

  // the following methods are used to get the publishers and domains data from the server and update the shared services
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
          invokeNotification('success', 'Publisher added successfully');
        }
        // Update the publishers list, make a new request to get the updated list as it may have changed by other users
        this.getPublishers();
      },
      error: (error) => {
        this.onDataLoaded();
        invokeNotification('error', 'Failed to add new publisher: ' + error.error.message);
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
          invokeNotification('success', 'Domain added successfully');
        }
        // Update the domains list, make a new request to get the updated list as it may have changed by other users
        this.getDomains();
      },
      error: (error) => {
        this.onDataLoaded();
        invokeNotification('error', 'Failed to add new domain');
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
          invokeNotification('success', 'Domain updated successfully');
        }
        // Update the domains list, make a new request to get the updated list as it may have changed by other users
        this.getDomains();
      },
      error: (error) => {
        this.onDataLoaded();
        invokeNotification('error', 'Failed to update domain');
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
          invokeNotification('success', 'Domain deleted successfully');
        }
        // Update the domains list, make a new request to get the updated list as it may have changed by other users
        this.getDomains();
      },
      error: (error) => {
        this.onDataLoaded();
        invokeNotification('error', 'Failed to delete domain');
        console.error('Failed to delete domain', error);
      }
    });
  };
  
  
  // the following methods are used to handle the loading state of the view
  onDataLoading(): void {
    this.isLoading = true;
  }
  
  onDataLoaded(): void {
    this.isLoading = false;
  }

  // this method is used to handle the event when a publisher is selected from the list
  onPublisherSelected(publisher: IPublisher): void {
    this.selectedPublisher = publisher;
  }

  // cleanup subscriptions
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
