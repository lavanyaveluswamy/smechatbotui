import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  @Input() userName: string = 'Lavanya Veluswamy';
  @Input() isLoggedIn: boolean = true;

  onLogin() {
    // TODO: Implement login logic
  }

  onLogout() {
    // TODO: Implement logout logic
  }
}
