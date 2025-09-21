import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, HttpClientModule],
  templateUrl: './upload.html',
  styleUrls: ['./upload.scss']
})
export class UploadComponent {
  file: File | null = null;

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
    }
  }
  onTest() {
    console.log('Test button clicked');
  }

  //onSubmit(event: Event) {
    onUploadClick() {
   // event.preventDefault();
    if (!this.file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64Content = (reader.result as string).split(',')[1];
      const payload = {
        filename: this.file!.name,
        file: base64Content
      };
      this.http.post('https://6rcdg00vhj.execute-api.us-east-2.amazonaws.com/dev/valid', payload)
        .subscribe({
          next: (response) => {
            console.log('Chat response:', response);
          },
          error: (error) => {
            console.error('Chat API call failed:', error);
          }
        });
    };
    reader.readAsDataURL(this.file);
  }
}
