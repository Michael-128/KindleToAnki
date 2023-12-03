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
    this.DBReader.db().statusChange.subscribe(status => {
      this.dbReaderStatus = status
      this.checkExtractingProgress()
    })

    this.DictionaryReader.dict().statusChange.subscribe(status => {
      this.dictStatus = status
      this.checkExtractingProgress()
    })
  }

  async onDictionaryChange(files: FileList) {
    this.DictionaryReader.dict().setStatus(Status.INITIALIZING)
    const buffer: Buffer = await files[0].arrayBuffer() as Buffer
    this.DictionaryReader.openDictionary(buffer)
  }

  async onDatabaseChange(files: FileList) {
    this.DBReader.db().setStatus(Status.INITIALIZING)
    const buffer: Buffer = await files[0].arrayBuffer() as Buffer
    this.DBReader.openDatabase(buffer)
  }

  dictStatus: Status = this.DictionaryReader.dict().status
  dbReaderStatus: Status = this.DBReader.db().status

  isExtracting: Boolean = false

  checkExtractingProgress() {
    console.log(this.dbReaderStatus, this.dictStatus)
    if(this.dictStatus == Status.INITIALIZED && this.dbReaderStatus == Status.INITIALIZED && this.isExtracting) {
      this.router.navigate(["vocab"])
      this.isExtracting = false
    }
  }

  onClickExtract(event: Event) {
    this.isExtracting = true
    this.checkExtractingProgress()
  }
}
