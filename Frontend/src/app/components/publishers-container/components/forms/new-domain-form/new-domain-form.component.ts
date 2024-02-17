import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IDomain, INewDomain, IPublisher } from '../../../models';
import { SharedDomainsService } from '../../../shared/shared-domains.service';
import { DomainExistsInCurrentState } from '../../../validations/DomainExistsInCurrentState';
import { CommonModule } from '@angular/common';
import { verifyDomainNameIntegrityValidator } from '../../../validations/verifyDomainNameIntegrityValidator';
import { SharedPublishersService } from '../../../shared/shared-publishers.service';
import { invokeNotification } from '../../../../reuseables/notifications';

/**
 * 
 * NewDomainFormComponent
 * 
 * This component is responsible for displaying the new domain form.
 * it handles the verifications of the domain inputs and the addition of the domain.
 */
@Component({
  selector: 'app-new-domain-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-domain-form.component.html',
  styleUrl: './new-domain-form.component.css'
})
export class NewDomainFormComponent {
  @Input() publisher: IPublisher | null = null;
  @Output() addDomain  = new EventEmitter<IDomain>();

  DomainForm: FormGroup;

  constructor(private fb: FormBuilder, private sharedDomainsService: SharedDomainsService, private sharedPublisherService: SharedPublishersService) {
    this.DomainForm = this.fb.group({
      domain: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        DomainExistsInCurrentState(this.sharedDomainsService.domains, this.sharedPublisherService.publishers),
        verifyDomainNameIntegrityValidator()
      ]),
      desktopAds: new FormControl(null, [
        Validators.required,
        Validators.min(0)
      ]),
      mobileAds: new FormControl(null, [
        Validators.required,
        Validators.min(0)
      ])
    });
  }

  onSubmit() {
    if(!this.DomainForm.touched){
      invokeNotification('info', 'Please fill the form before submitting');
      return;
    }
    if (this.DomainForm.valid) {
      //edge case where publisher is null
      if(this.publisher === null) {
        invokeNotification('error', 'Publisher is gone :( refresh the page and try again.');
        throw new Error('Publisher is null');
      }
      const domain: INewDomain = {
        domain: this.DomainForm.value.domain,
        desktopAds: this.DomainForm.value.desktopAds,
        mobileAds: this.DomainForm.value.mobileAds,
        publisherId: this.publisher.id
      };
      this.sharedDomainsService.addDomain(domain);
      this.DomainForm.reset();
    }
  }
}
