import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { IDomain } from '../../../models';

@Component({
  selector: 'app-domain-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './domain-card.component.html',
  styleUrl: './domain-card.component.css'
})
export class DomainCardComponent {
  @Input() domain!: IDomain;
  isEdit: boolean = false;
  _domain!: IDomain;

  constructor() {
  }

  ngOnInit(): void {
    this._domain = JSON.parse(JSON.stringify(this.domain));
  }

  toggleEdit() {
    this.isEdit = !this.isEdit;
  }

  editDomain() {
    this.domain = JSON.parse(JSON.stringify(this._domain));
    this.toggleEdit()

  }
}
