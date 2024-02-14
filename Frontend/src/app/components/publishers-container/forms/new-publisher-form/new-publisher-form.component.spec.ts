import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPublisherFormComponent } from './new-publisher-form.component';

describe('NewPublisherFormComponent', () => {
  let component: NewPublisherFormComponent;
  let fixture: ComponentFixture<NewPublisherFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPublisherFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewPublisherFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
