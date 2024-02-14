import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDomainFormComponent } from './new-domain-form.component';

describe('NewDomainFormComponent', () => {
  let component: NewDomainFormComponent;
  let fixture: ComponentFixture<NewDomainFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewDomainFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewDomainFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
