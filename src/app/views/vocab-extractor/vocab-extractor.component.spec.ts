import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabExtractorComponent } from './vocab-extractor.component';

describe('VocabExtractorComponent', () => {
  let component: VocabExtractorComponent;
  let fixture: ComponentFixture<VocabExtractorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VocabExtractorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VocabExtractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
