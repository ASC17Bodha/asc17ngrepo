import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopsListComponent } from './workshops-list.component';

describe('WorkshopsListComponent', () => {
  let component: WorkshopsListComponent;
  let fixture: ComponentFixture<WorkshopsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
