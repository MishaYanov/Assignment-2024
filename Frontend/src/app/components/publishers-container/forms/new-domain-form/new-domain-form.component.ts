import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IDomain } from '../../../../models';

/*
found bugs as follows:
desktop ads in view are not aligned the same as in edit possible issue is that it prone to errors
both ad fields pointed to the same value
*/


@Component({
  selector: 'app-new-domain-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-domain-form.component.html',
  styleUrl: './new-domain-form.component.css'
})
export class NewDomainFormComponent {
  @Output() addDomain  = new EventEmitter<IDomain>();
  DomainForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.DomainForm = this.fb.group({
      domain: '',
      desktopAds: 0,
      mobileAds: 0
    });
  }

  onSubmit() {
    if (this.DomainForm.valid) {
      this.addDomain .emit(this.DomainForm.value as IDomain);
      this.DomainForm.reset();
    }
  }
}
