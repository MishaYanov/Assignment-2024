import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IDomain, IPublisher } from '../../../../models';

@Component({
  selector: 'app-new-publisher-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-publisher-form.component.html',
  styleUrl: './new-publisher-form.component.css'
})
export class NewPublisherFormComponent {
  @Output() addPublisher = new EventEmitter<IPublisher>();
  publisherForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.publisherForm = this.fb.group({
      publisher: '',
      domains: this.fb.array([]),
    });
  }

  onSubmit() {
    if (this.publisherForm.valid) {
      this.addPublisher.emit(this.publisherForm.value as IPublisher);
      this.publisherForm.reset();
    }
  }
}
