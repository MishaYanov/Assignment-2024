import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INewPublisher, IPublisher } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PublishersService {
  private url = 'http://localhost:3000/publishers';
  constructor(private http: HttpClient) {}

  public getAllPublishers(): Observable<IPublisher[]> {
    return this.http.get<IPublisher[]>(this.url + '/all');
  }

  public addPublisher(publisher: INewPublisher) {
    return this.http.post(this.url + '/add', { name: publisher.name });
  }
}
