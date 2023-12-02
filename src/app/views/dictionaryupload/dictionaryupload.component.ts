import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DropzoneComponent } from 'src/app/components/dropzone/dropzone.component';
import { DictionaryReaderService } from 'src/app/services/dictreader.service';

@Component({
  standalone: true,
  selector: 'app-dictionaryupload',
  templateUrl: './dictionaryupload.component.html',
  styleUrls: ['./dictionaryupload.component.scss'],
  imports: [DropzoneComponent]
})
export class DictionaryUploadComponent {
  constructor(private DictionaryReader: DictionaryReaderService, private router: Router) { }

  async onDictFileDrop(files: FileList) {
    if(!files) return
    this.DictionaryReader.openDictionary(await files[0].arrayBuffer() as Buffer)
    this.router.navigate(["vocab"])
  }
}
