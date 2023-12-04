import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FileUploadComponent } from 'src/app/components/file-upload/file-upload.component';
import { DBReaderService } from 'src/app/services/dbreader.service';
import { DictionaryReaderService } from 'src/app/services/dictreader.service';
import { Status } from 'src/types/IStatus';
import { ILookup, IWord } from 'src/types/database';
import { CSVParser } from 'src/classes/csvparser';

@Component({
  selector: 'app-vocabbrowser',
  templateUrl: './vocab-browser.component.html',
  styleUrls: ['./vocab-browser.component.scss'],
  imports: [FileUploadComponent, CommonModule],
  standalone: true
})
export class VocabBrowserComponent {
  constructor(private DBReader: DBReaderService, private DictionaryReader: DictionaryReaderService, private router: Router) {
    if(DBReader.db().status == Status.UNINITIALIZED || DictionaryReader.dict().status == Status.UNINITIALIZED) {
      router.navigate([""])
    }

    if(DBReader.db().status == Status.INITIALIZED) {
      this.getLookups()
    } else {
      DBReader.db().statusChange.subscribe(status => {
        if(status == Status.INITIALIZED) {
          this.getLookups()
        }
      })
    }
  }

  lookups: ILookup[] = []

  private getLookups() {
    this.lookups = this.DBReader.db().getAllLookups()
  }

  getCSV() {
    let lookups: string[][] = [];
    
    lookups = lookups.concat(this.lookups.map((lookup) => {
      const word = lookup.getWord()
      return [word.word, lookup.usage, this.getDefinitions(word).join("\\n")]
    }))

    const csv = CSVParser.getParsed(
      ["word", "sentence", "definitions"],
      lookups
    )

    const link = document.createElement("a");
    const file = new Blob([csv], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = "vocab.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  }
  
  getDefinitions(word: IWord): string[] {
    var defs = this.DictionaryReader.dict().getDefinitions(word.word)
    defs = defs.flatMap(def => {
      return def.split("\n")
    })
    //console.log(defs)
    return defs
  }

  getLookedUpSentence(lookup: ILookup): string {
    const word = lookup.getWord().word

    return lookup.usage.replaceAll(word, `<span class="sentence-highlight">${word}</span>`)
  }
}
