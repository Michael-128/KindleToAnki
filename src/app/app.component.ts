import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { DBReaderService } from 'src/services/dbreader.service';

import { ILookup, IWord } from 'src/types/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public DBReader: DBReaderService, public sanitizer: DomSanitizer) { }

  lookups: ILookup[] = []

  async onFileChange(event: Event) {
    const input: HTMLInputElement = event.target as HTMLInputElement
    const files: FileList | null = input.files
    if(!files) return

    if(await this.DBReader.openDatabase(await files[0].arrayBuffer() as Buffer)) {
      this.lookups = this.DBReader.db().getAllLookups()
    }
  }

  getLookupSentence(lookup: ILookup) {
    const word = this.DBReader.db().getWordById(lookup.word_key)
    return lookup.usage.replace(word.word, "<span class='word'>" + word.word + "</span>")
  }
}
