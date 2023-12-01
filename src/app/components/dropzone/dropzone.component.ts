import { Component, EventEmitter, Input } from '@angular/core';
import { Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent {
  @Output() dropzoneDrop = new EventEmitter<FileList>();
  
  onDrop(event: Event) {
    const files = (event as any).dataTransfer.files
    this.dropzoneDrop.emit(files)
  }
}
