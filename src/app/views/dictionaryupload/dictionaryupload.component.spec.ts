import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryUploadComponent } from './dictionaryupload.component';

describe('DictionaryuploadComponent', () => {
  let component: DictionaryUploadComponent;
  let fixture: ComponentFixture<DictionaryUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DictionaryUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DictionaryUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
