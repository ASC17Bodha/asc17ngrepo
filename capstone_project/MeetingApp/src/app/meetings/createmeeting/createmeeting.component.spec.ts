import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatemeetingComponent } from './createmeeting.component';

describe('CreatemeetingComponent', () => {
  let component: CreatemeetingComponent;
  let fixture: ComponentFixture<CreatemeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatemeetingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatemeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
