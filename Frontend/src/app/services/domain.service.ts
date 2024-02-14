import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDomain } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DomainService {
  private apiUrl = 'http://your-api-url.com/domains'; // Update with your actual API URL

  constructor(private http: HttpClient) {}

  //this method will get all the domains of all the publishers for required validation.
  getAllDomains(): Observable<IDomain[]> {
    return this.http.get<IDomain[]>(this.apiUrl);
  }

  
  getAllDomainsByPublisher(publisherName: string): Observable<IDomain[]> {
    return this.http.get<IDomain[]>(
      `${this.apiUrl}?publisher=${encodeURIComponent(publisherName)}`
    );
  }

  getDomainById(publisherName: string, id: string): Observable<IDomain> {
    return this.http.get<IDomain>(
      `${this.apiUrl}/${encodeURIComponent(publisherName)}/${id}`
    );
  }

  addDomain(publisherName: string, domain: IDomain): Observable<IDomain> {
    return this.http.post<IDomain>(
      `${this.apiUrl}/${encodeURIComponent(publisherName)}`,
      domain
    );
  }

  updateDomain(
    publisherName: string,
    id: string,
    domain: IDomain
  ): Observable<IDomain> {
    // Assuming the API design for updating requires specifying both publisherName and domain ID
    return this.http.put<IDomain>(
      `${this.apiUrl}/${encodeURIComponent(publisherName)}/${id}`,
      domain
    );
  }
}
