import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { DBReaderService } from 'src/app/services/dbreader.service';
import { DictionaryReaderService } from 'src/app/services/dictreader.service';
import { Status } from 'src/types/IStatus';
import { ILookup, IWord } from 'src/types/database';

@Component({
  selector: 'app-vocabbrowser',
  templateUrl: './vocabbrowser.component.html',
  styleUrls: ['./vocabbrowser.component.scss']
})
export class VocabBrowserComponent {
  constructor(private DBReader: DBReaderService, private DictionaryReader: DictionaryReaderService, private router: Router) {  
    this.DBReader.db().status.subscribe(status => {
      if(status == Status.UNINITIALIZED) {
        router.navigate([""])
      } else if(status == Status.INITIALIZED) {
        this.getLookups()
      }
    })    
    this.DictionaryReader.dict().status.subscribe(status => {
      if(status == Status.UNINITIALIZED)
        router.navigate(["dictionary"])
    })
  }

  lookups: ILookup[] = []

  private getLookups() {
    this.lookups = this.DBReader.db().getAllLookups()
  }

  getDefinitions(word: IWord) {
    return this.DictionaryReader.dict().getDefinitions(word.word)
  }

  getLookedUpSentence(lookup: ILookup): string {
    const word = lookup.getWord().word

    return lookup.usage.replaceAll(word, `<span class="word">${word}</span>`)
  }
}
