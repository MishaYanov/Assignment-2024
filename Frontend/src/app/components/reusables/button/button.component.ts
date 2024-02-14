import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  constructor() {}

  @Input('text') text: string | undefined;
  @Input('customClass') customClass: string | undefined;
  @Output() btnClick: any = new EventEmitter();

  ngOnInit(): void {}
  emitHandler() {
    this.btnClick.emit();
  }
}
