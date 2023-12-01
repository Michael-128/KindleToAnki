import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms'
import { RouterOutlet, provideRouter } from '@angular/router';

import { VocabUploadView } from './views/vocabupload/vocabupload.component';
import { DropzoneComponent } from './components/dropzone/dropzone.component';
import { DictionaryUploadComponent } from './views/dictionaryupload/dictionaryupload.component';
import { VocabbrowserComponent as VocabBrowserComponent } from './views/vocabbrowser/vocabbrowser.component';


@NgModule({
  declarations: [
    AppComponent,
    VocabBrowserComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterOutlet
  ],
  providers: [provideRouter([
    {path: "", component: VocabUploadView},
    {path: "dictionary", component: DictionaryUploadComponent},
    {path: "vocab", component: VocabBrowserComponent}
  ])],
  bootstrap: [AppComponent]
})
export class AppModule { }
