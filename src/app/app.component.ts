import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { DBReaderService } from 'src/app/services/dbreader.service';

import { ILookup, IWord } from 'src/types/database';
import { DictionaryReaderService } from './services/dictreader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ngOnInit(): void {
    window.addEventListener("dragover", e => {
      e && e.preventDefault();
    }, false);
    window.addEventListener("drop", e => {
      e && e.preventDefault();
    }, false);
  }
}
