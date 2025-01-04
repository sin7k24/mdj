import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-config-page',
    templateUrl: './config-page.component.html',
    styleUrls: ['./config-page.component.scss']
})
export class ConfigPageComponent {
    constructor(private http: HttpClient, private router: Router) { }

    send() {
        console.log("send!!!!");
        const body = {
            id: "nakanishi8",
            password: "hoge111",
            savepath: "/Users/nakanishishingo/src/md/diary"
        };

        this.http.post('api/v1/users', body, { responseType: 'text' }).subscribe({
            next: (res) => {
                this.router.navigate(['/login']);
            },
            error: (err) => {
                console.log(err);
            }
        });
    }
}
