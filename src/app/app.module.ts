import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms'
import { RouterOutlet, provideRouter } from '@angular/router';

import { VocabExtractorComponent } from './views/vocab-extractor/vocab-extractor.component';
import { VocabBrowserComponent } from './views/vocab-browser/vocab-browser.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterOutlet
  ],
  providers: [provideRouter([
    {path: "", component: VocabExtractorComponent},
    {path: "vocab", component: VocabBrowserComponent},
    /*{path: "dictionary", component: DictionaryUploadComponent},
    {path: "vocab", component: VocabBrowserComponent}*/
  ])],
  bootstrap: [AppComponent]
})
export class AppModule { }
