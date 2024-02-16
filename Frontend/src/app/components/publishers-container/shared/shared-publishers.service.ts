import { Injectable } from '@angular/core';
import { INewPublisher, IPublisher } from '../models';
import { BehaviorSubject, Subject } from 'rxjs';

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
    console.log('Setting publishers', publishers);
    this._publishers = publishers;
    this.publishers$.next(this._publishers);
  }

  public getPublisherById(id: number): IPublisher {
    return this._publishers.find(publisher => publisher.id === id) as IPublisher;
  }

  //publisher addition event
  public addPublisher(publisher: INewPublisher) {
    this._publisherAddedSource.next(publisher);
  }

}
