import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  standalone: true
})
export class FileUploadComponent {
  filename: string = "None"
  @Input() allowedExtensions: string = ""

  @Output() onFileChange = new EventEmitter<FileList>()

  onChange(event: Event) {
    const files: FileList = (event as any).target.files
    console.log(files)
    this.filename = Array.from(files).flatMap((file: File) => file.name).join(", ")
    this.onFileChange.emit(files)
  }
}
