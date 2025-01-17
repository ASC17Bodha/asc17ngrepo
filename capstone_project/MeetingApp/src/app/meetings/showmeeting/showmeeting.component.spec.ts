import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowmeetingComponent } from './showmeeting.component';

describe('ShowmeetingComponent', () => {
  let component: ShowmeetingComponent;
  let fixture: ComponentFixture<ShowmeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowmeetingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowmeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
