import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DropzoneComponent } from 'src/app/components/dropzone/dropzone.component';
import { DBReaderService } from 'src/app/services/dbreader.service';

@Component({
  standalone: true,
  selector: 'app-vocabupload',
  templateUrl: './vocabupload.component.html',
  styleUrls: ['./vocabupload.component.scss'],
  imports: [DropzoneComponent]
})
export class VocabUploadView {
  constructor(private DBReader: DBReaderService, private router: Router) {  }

  async onDBFileDrop(files: FileList) {
    if(!files) return
    await this.DBReader.openDatabase(await files[0].arrayBuffer() as Buffer)
    this.router.navigate(["vocab"])
  }
}
