import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FileUploadComponent } from 'src/app/components/file-upload/file-upload.component';
import { DBReaderService } from 'src/app/services/dbreader.service';
import { DictionaryReaderService } from 'src/app/services/dictreader.service';
import { Status } from 'src/types/IStatus';
import { ILookup, IWord } from 'src/types/database';

@Component({
  selector: 'app-vocabbrowser',
  templateUrl: './vocab-browser.component.html',
  styleUrls: ['./vocab-browser.component.scss'],
  imports: [FileUploadComponent],
  standalone: true
})
export class VocabBrowserComponent {
  constructor(private DBReader: DBReaderService, private DictionaryReader: DictionaryReaderService, private router: Router) { 
    this.DBReader.db().status.subscribe(status => {
      switch(status) {
        case Status.INITIALIZED:
          this.getLookups()
          break;
      }
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
    console.log("click")
  }

  lookups: ILookup[] = []

  private getLookups() {
    this.lookups = this.DBReader.db().getAllLookups()
  }
  /*
  getDefinitions(word: IWord): string[] {
    var defs = this.DictionaryReader.dict().getDefinitions(word.word)
    defs = defs.flatMap(def => {
      return def.split("\n")
    })
    console.log(defs)
    return defs
  }

  getLookedUpSentence(lookup: ILookup): string {
    const word = lookup.getWord().word

    return lookup.usage.replaceAll(word, `<span class="sentence-highlight">${word}</span>`)
  }*/
}
