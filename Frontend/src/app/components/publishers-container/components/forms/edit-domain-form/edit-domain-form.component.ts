import { Component, Input } from '@angular/core';
import { IDomain, IPublisher } from '../../../models';
import { SharedPublishersService } from '../../../shared/shared-publishers.service';
import { SharedDomainsService } from '../../../shared/shared-domains.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomainExistsInCurrentState } from '../../../validations/DomainExistsInCurrentState';
import { verifyDomainNameIntegrityValidator } from '../../../validations/verifyDomainNameIntegrityValidator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-domain-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-domain-form.component.html',
  styleUrl: './edit-domain-form.component.css'
})
export class EditDomainFormComponent {

  @Input() domain: IDomain | null = null;

  DomainForm: FormGroup;
  
  constructor(private sharedPublisherService: SharedPublishersService, private sharedDomainsService: SharedDomainsService, private fb: FormBuilder,) 
  {
    this.DomainForm = this.fb.group({
      domain: new FormControl(this.domain?.domain, [
        Validators.minLength(1),
        DomainExistsInCurrentState(this.sharedDomainsService.domains),
        verifyDomainNameIntegrityValidator()
      ]),
      desktopAds: new FormControl(this.domain?.desktopAds, [
        Validators.min(0)
      ]),
      mobileAds: new FormControl(this.domain?.mobileAds, [
        Validators.min(0)
      ])
    });
  }

  checkWhichValueIsUpdated(domain: IDomain, updatedDomain: IDomain): IDomain | Boolean {
    let newDomain: IDomain = domain;
    if((domain.domain === updatedDomain.domain && domain.desktopAds === updatedDomain.desktopAds && domain.mobileAds === updatedDomain.mobileAds)) {
      return false;
    }
    if ( updatedDomain.domain === null && updatedDomain.desktopAds === null && updatedDomain.mobileAds === null) {
      return false;
    }
    if (domain.domain !== updatedDomain.domain && updatedDomain.domain !== null) {
      newDomain.domain = updatedDomain.domain;
    }
    if (domain.desktopAds !== updatedDomain.desktopAds && updatedDomain.desktopAds !== null) {
      newDomain.desktopAds = updatedDomain.desktopAds;
    }
    if (domain.mobileAds !== updatedDomain.mobileAds && updatedDomain.mobileAds !== null) {
      newDomain.mobileAds = updatedDomain.mobileAds;
    }
    newDomain.publisherId = domain.publisherId;
    return newDomain;
  }

  onSubmit() {
    if (this.DomainForm.valid) {
      debugger
      const updatedDomain: IDomain | Boolean = this.checkWhichValueIsUpdated(this.domain!, this.DomainForm.value);
      if (updatedDomain === false) {
        //no changes were made
        alert('No changes were made');
        return;
      } else{
        this.sharedDomainsService.updateDomain(updatedDomain as IDomain);
        this.DomainForm.reset();
      }
    }
  }

}
