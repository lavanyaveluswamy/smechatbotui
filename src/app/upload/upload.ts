import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { routes } from '../app.routes';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, HttpClientModule],
  templateUrl: './upload.html',
  styleUrls: ['./upload.scss']
})
export class UploadComponent {

  file: File | null = null;

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {}

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const selectedFile = fileList[0];
      const allowedTypes = ['application/pdf', 'application/vnd.ms-powerpoint', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

      if (!allowedTypes.includes(selectedFile.type)) {
        this.snackBar.open('Invalid file type. Only PDF, PPT, Text, and Word files are allowed.', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        return;
      }

      this.file = selectedFile;
    }
  }
  onTest() {
    console.log('Test button clicked');
  }

  
    onUploadClick() {
  
    if (!this.file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64Content = (reader.result as string).split(',')[1];
      const payload = {
        filename: this.file!.name,
        file: base64Content
      };
      this.http.post('https://6rcdg00vhj.execute-api.us-east-2.amazonaws.com/dev/smechatbot', payload)
        .subscribe({
          next: (response) => {
            // Handle successful response - Navigate to dashboard page - need to display file uploaf success message
            this.snackBar.open('File uploaded successfully!', 'Close', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
            
            this.router.navigate(['/dashboard']);
            
          },
          error: (error) => {
            console.error('Chat API call failed:', error);
          }
        });
    };
    reader.readAsDataURL(this.file);
  }
}
