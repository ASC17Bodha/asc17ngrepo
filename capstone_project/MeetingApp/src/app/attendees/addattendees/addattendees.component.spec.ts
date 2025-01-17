import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddattendeesComponent } from './addattendees.component';

describe('AddattendeesComponent', () => {
  let component: AddattendeesComponent;
  let fixture: ComponentFixture<AddattendeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddattendeesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddattendeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
