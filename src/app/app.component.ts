import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'mdj';

    apiUrl: string = 'api/v1/init';

    constructor(private router: Router, private http: HttpClient) {}

    ngOnInit() {
        const loginId = sessionStorage.getItem('login.id');
        console.log(loginId);
        if (!loginId) {
            this.router.navigate(['/login']);
            return;
        }else{
            this.router.navigate(['/diary']);            
        }

        // this.http.get(this.apiUrl, { responseType: 'text' }).subscribe({
        //     next: (html) => {
        //         this.router.navigate(['/diary']);
        //     },
        //     error: (err) => {
        //         // this.router.navigate(['/config']);
        //         console.log(err);
        //     },
        // });
    }

    public moveToDiaryPage() {
        this.router.navigate(['/diary']);
    }
}
