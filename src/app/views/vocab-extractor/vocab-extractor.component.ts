import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { FileUploadComponent } from 'src/app/components/file-upload/file-upload.component';
import { DBReaderService } from 'src/app/services/dbreader.service';
import { DictionaryReaderService } from 'src/app/services/dictreader.service';
import { Status } from 'src/types/IStatus';
import { ILookup } from 'src/types/database';

@Component({
  selector: 'app-vocab-extractor',
  templateUrl: './vocab-extractor.component.html',
  styleUrls: ['./vocab-extractor.component.scss'],
  imports: [FileUploadComponent],
  standalone: true
})
export class VocabExtractorComponent {
  constructor(private DBReader: DBReaderService, private DictionaryReader: DictionaryReaderService, private router: Router) { 
    combineLatest([this.DBReader.db().status, this.DictionaryReader.dict().status]).pipe().subscribe(([dbStatus, dictStatus]) => {
      console.log(dbStatus,dictStatus)
    })
  }

  async onDictionaryChange(files: FileList) {
    const buffer: Buffer = await files[0].arrayBuffer() as Buffer
    this.DictionaryReader.openDictionary(buffer)
  }

  async onDatabaseChange(files: FileList) {
    const buffer: Buffer = await files[0].arrayBuffer() as Buffer
    this.DBReader.openDatabase(buffer)
  }

  onClickExtract() {
    
  }
}
