import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabbrowserComponent } from './vocabbrowser.component';

describe('VocabbrowserComponent', () => {
  let component: VocabbrowserComponent;
  let fixture: ComponentFixture<VocabbrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VocabbrowserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VocabbrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
