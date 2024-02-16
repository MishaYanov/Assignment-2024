import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPublisher } from '../../models';
import { SharedPublishersService } from '../../shared/shared-publishers.service';
import { NewPublisherFormComponent } from '../forms/new-publisher-form/new-publisher-form.component';

@Component({
  selector: 'app-publisher-list',
  standalone: true,
  imports: [CommonModule, NewPublisherFormComponent],
  templateUrl: './publisher-list.component.html',
  styleUrls: ['./publisher-list.component.css'] // Corrected property name
})
export class PublisherListComponent implements OnInit {
  public data: IPublisher[] = [];
  public currentSelectedPublisher: IPublisher | null = null;
  public isNewPublisherFormVisible = false;
  @Output() publisherSelected = new EventEmitter<IPublisher>();

  constructor(private sharedPublishers: SharedPublishersService) {}

  ngOnInit(): void {
    this.sharedPublishers.publishersObservable.subscribe((publishers: IPublisher[]) => {
      this.data = publishers;
    });
  }

  public selectPublisher(publisher: IPublisher): void {
    this.currentSelectedPublisher = publisher;
    this.publisherSelected.emit(publisher);
  }

  toggleNewPublisherForm(): void {
    this.isNewPublisherFormVisible = !this.isNewPublisherFormVisible;
  };
}
