import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  apiUrl: string = 'api/v1/login';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { 
    
  }

  login() {

    sessionStorage.setItem('login.id', 'test');
    location.href = '/';
  }
}
