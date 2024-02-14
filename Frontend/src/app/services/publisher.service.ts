import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPublisher } from '../models/IPublisher'; // Update the path as necessary

@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  private apiUrl = 'http://your-api-url.com/publishers'; // Update with your actual API URL

  constructor(private http: HttpClient) { }

  // GET: Fetch all publishers
  getPublishers(): Observable<IPublisher[]> {
    return this.http.get<IPublisher[]>(this.apiUrl);
  }

  // GET: Fetch a single publisher by id
  getPublisherById(id: string): Observable<IPublisher> {
    return this.http.get<IPublisher>(`${this.apiUrl}/${id}`);
  }

  // POST: Add a new publisher
  addPublisher(publisher: IPublisher): Observable<IPublisher> {
    return this.http.post<IPublisher>(this.apiUrl, publisher);
  }

  // PUT: Update an existing publisher
  updatePublisher(id: string, publisher: IPublisher): Observable<IPublisher> {
    return this.http.put<IPublisher>(`${this.apiUrl}/${id}`, publisher);
  }

  // DELETE: Delete a publisher by id
  deletePublisher(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
