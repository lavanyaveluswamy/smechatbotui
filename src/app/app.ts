import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './login/login';
import { HeaderComponent } from './header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    Login,
    HeaderComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('smeChatbot');
}
