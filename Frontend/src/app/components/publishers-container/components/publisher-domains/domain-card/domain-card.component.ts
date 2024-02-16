import { Component, Input } from '@angular/core';
import { IDomain } from '../../../models';
import { SharedDomainsService } from '../../../shared/shared-domains.service';
import { EditDomainFormComponent } from '../../forms/edit-domain-form/edit-domain-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-domain-card',
  standalone: true,
  imports: [EditDomainFormComponent, CommonModule],
  templateUrl: './domain-card.component.html',
  styleUrl: './domain-card.component.css'
})
export class DomainCardComponent {
  @Input() domain: IDomain | null = null;
  isDomainFormVisible = false;
  isDeleteVerificationVisible = false;

  constructor(private sharedDomainService: SharedDomainsService) {}


  deleteDomain(): void {
    if (this.domain) {
      debugger;
      this.sharedDomainService.deleteDomain(this.domain.id);
    }
  }

  toggleDomainForm(): void {
    this.isDomainFormVisible = !this.isDomainFormVisible;
  }
  toggleDeleteVerification(): void {
    this.isDeleteVerificationVisible = !this.isDeleteVerificationVisible;
  }
}
