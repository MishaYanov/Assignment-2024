import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { INewPublisher, IPublisher } from '../../../models';
import { CommonModule } from '@angular/common';
import { SharedPublishersService } from '../../../shared/shared-publishers.service';
import { invokeNotification } from '../../../../reuseables/notifications';

@Component({
  selector: 'app-new-publisher-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-publisher-form.component.html',
  styleUrl: './new-publisher-form.component.css'
})
export class NewPublisherFormComponent {
  @Output() addPublisher = new EventEmitter<IPublisher>();
  publisherForm: FormGroup;

  constructor(private fb: FormBuilder, private sharedPublishersService: SharedPublishersService) {
    this.publisherForm = this.fb.group({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(1) 
      ])
    });
  }

  //this function uses global sharedPublishersService to add a new publisher in order to reduce code duplication and decouple the components
  onSubmit() {
    if(!this.publisherForm.touched){
      invokeNotification('info', 'Please fill the form before submitting');
      return;
    }
    if (this.publisherForm.valid) {
      const publisher: INewPublisher = {
        name: this.publisherForm.value.name
      };
      this.sharedPublishersService.addPublisher(publisher);
      this.publisherForm.reset();
    }
  }
}
