import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPublisher } from '../../models';
import { SharedPublishersService } from '../../shared/shared-publishers.service';
import { NewPublisherFormComponent } from '../forms/new-publisher-form/new-publisher-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { animate, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-publisher-list',
  standalone: true,
  imports: [CommonModule, NewPublisherFormComponent],
  templateUrl: './publisher-list.component.html',
  styleUrls: ['./publisher-list.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias for 'void => *'
        style({ opacity: 0, height: '0px', overflow: 'hidden' }),
        animate('0.5s ease-out', style({ opacity: 1, height: '*' })),
      ]),
      transition(':leave', [   // :leave is alias for '* => void'
        animate('0.5s ease-in', style({ opacity: 0, height: '0px' })),
      ])
    ])
  ]
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
