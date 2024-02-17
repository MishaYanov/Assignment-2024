import { Injectable } from '@angular/core';
import { INewPublisher, IPublisher } from '../models';
import { BehaviorSubject, Subject } from 'rxjs';

/**
 * SharedPublishersService
 * 
 * This service is responsible for handling the publishers data and events.
 * It is used to share the publishers data between the components and to handle the events related to the publishers.
 */

@Injectable({
  providedIn: 'root'
})
export class SharedPublishersService {
  constructor() { }

  private _publishers: IPublisher[] = [];

  private _publisherAddedSource = new Subject<INewPublisher>();

  private publishers$ = new BehaviorSubject<IPublisher[]>(this._publishers);
  publisherAdded$ = this._publisherAddedSource.asObservable();

  // THIS IS RELATED TO THE PUBLISHERS LIST
  get publishers(): IPublisher[] {
    return this._publishers;
  }

  get publishersObservable() {
    return this.publishers$.asObservable();
  }

  set publishers(publishers: IPublisher[]) {
    this._publishers = publishers;
    this.publishers$.next(this._publishers);
  }

  // this method is left here as this is an alternative way to get the publisher for additional config that is not needed in this project
  public getPublisherById(id: number): IPublisher {
    return this._publishers.find(publisher => publisher.id === id) as IPublisher;
  }

  //publisher addition event
  public addPublisher(publisher: INewPublisher) {
    this._publisherAddedSource.next(publisher);
  }

}
