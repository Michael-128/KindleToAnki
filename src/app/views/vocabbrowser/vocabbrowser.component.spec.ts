import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabBrowserComponent } from './vocabbrowser.component';

describe('VocabbrowserComponent', () => {
  let component: VocabBrowserComponent;
  let fixture: ComponentFixture<VocabBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VocabBrowserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VocabBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
