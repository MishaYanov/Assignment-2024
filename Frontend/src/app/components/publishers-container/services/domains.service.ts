import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDomain, INewDomain } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DomainsService {

  private url = 'http://localhost:3000/domains';

  constructor(private http: HttpClient) {}

  public getAllDomains(): Observable<IDomain[]> {
    return this.http.get<IDomain[]>(this.url + '/all');
  }

  public addDomain(domain: INewDomain) {
    return this.http.post(this.url + '/add', { domain: domain.domain, publisherId: domain.publisherId, desktopAds: domain.desktopAds, mobileAds: domain.mobileAds });
  }

  public updateDomain(domain: IDomain) {
    return this.http.put(this.url + '/update/'+ domain.id, { id: domain.id, domain: domain.domain, publisherId: domain.publisherId, desktopAds: domain.desktopAds, mobileAds: domain.mobileAds });
  }

  public deleteDomain(id: number) {
    return this.http.delete(this.url + '/delete/' + id);
  }
}
