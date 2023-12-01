import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabUploadView } from './vocabupload.component';

describe('VocabuploadComponent', () => {
  let component: VocabUploadView;
  let fixture: ComponentFixture<VocabUploadView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VocabUploadView ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VocabUploadView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
