import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UploadComponent } from '../upload/upload';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, UploadComponent, HttpClientModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
  showUpload = false;
  chatResponse: any;

  constructor(private http: HttpClient) {}

  onUploadDocument() {
    this.showUpload = true;
  }

  onChatWithBot() {
const payload = {
  "filename": "testfromui.txt",
  "file": "VGhpcyBpcyBhIHRlc3QgZmlsZSBjb250ZW50Lg=="
};

    this.showUpload = false;
    this.http.post('https://6rcdg00vhj.execute-api.us-east-2.amazonaws.com/dev/valid', payload)
      .subscribe({
        next: (response) => {
          this.chatResponse = response;
          console.log('Chat response:', response);
        },
        error: (error) => {
          console.error('Chat API call failed:', error);
        }
      });
  }
}
