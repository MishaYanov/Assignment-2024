import { Component, OnInit } from '@angular/core';
import { PublisherCardComponent } from './publisher-card/publisher-card.component';
import { CommonModule } from '@angular/common';
import { NewPublisherFormComponent } from './forms/new-publisher-form/new-publisher-form.component';
import { IDomain, IPublisher } from '../../models';
import { INITIAL_PUBLISHERS } from '../../constants/mock';
import { NewDomainFormComponent } from './forms/new-domain-form/new-domain-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-publishers-container',
  standalone: true,
  imports: [
    PublisherCardComponent,
    CommonModule,
    NewPublisherFormComponent,
    NewDomainFormComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './publishers-container.component.html',
  styleUrl: './publishers-container.component.css',
})
export class PublishersContainerComponent implements OnInit {
  protected isPublisherToAddVisible = false;
  protected isDomainToAddVisible = false;
  protected selectedPublisher: string = "";

  data: Array<IPublisher> = [];
  constructor() {}

  ngOnInit(): void {
    this.data = INITIAL_PUBLISHERS;
  }

  toggleAddNewPublisher(): void {
    console.log('toggleAddNewPublisher');
    this.isDomainToAddVisible = false;
    this.isPublisherToAddVisible = !this.isPublisherToAddVisible;
  }

  toggleAddNewDomain(): void {
    console.log('toggleAddNewDomain');
    this.isPublisherToAddVisible = false;
    this.isDomainToAddVisible = !this.isDomainToAddVisible;
  }

  addPublisher(publisher: IPublisher) {
    this.data.push(publisher);
  }

  addDomain(domain: IDomain, publisherName: string) {
    const publisher = this.data.find((p) => p.publisher === publisherName);
    if (publisher) {
      publisher.domains.push(domain);
    } else {
      console.error('Publisher not found:', publisherName);
    }
  }
}
