import { Injectable } from '@angular/core';
import { IDomain, INewDomain } from '../models';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs';

/**
 * SharedDomainsService
 * 
 * This service is responsible for handling the domains data and events.
 * It is used to share the domains data between the components and to handle the events related to the domains.
 * 
 */

@Injectable({
  providedIn: 'root'
})
export class SharedDomainsService {
  constructor() { }

  private _domains: IDomain[] = [];
  
  private _domainAddedSource = new Subject<INewDomain>();

  private _domainUpdatedSource = new Subject<IDomain>();

  private _domainDeletedSource = new Subject<number>();
  
  private domains$ = new BehaviorSubject<IDomain[]>(this._domains);
  domainAdded$ = this._domainAddedSource.asObservable();
  domainUpdated$ = this._domainUpdatedSource.asObservable();
  domainDeleted$ = this._domainDeletedSource.asObservable();

  // THIS IS RELATED TO THE DOMAINS LIST
  get domains(): IDomain[] {
    return this._domains;
  }

  get domainsObservable() {
    return this.domains$.asObservable();
  }

  set domains(domains: IDomain[]) {
    this._domains = domains;
    this.domains$.next(this._domains);
  }

  // this method is left here as this is an alternative way to get the domain for additional config that is not needed in this project
  public getDomainById(id: number): IDomain {
    return this._domains.find(domain => domain.id === id) as IDomain;
  }

  //domain addition event
  public addDomain(domain: INewDomain) {
    this._domainAddedSource.next(domain);
  }

  //domain update event
  public updateDomain(domain: IDomain) {
    this._domainUpdatedSource.next(domain);
  }
  
  //domain deletion event
  public deleteDomain(id: number) {
    this._domainDeletedSource.next(id);
  }
}
