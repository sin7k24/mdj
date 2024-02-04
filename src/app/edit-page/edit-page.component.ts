import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent {
    year = '2023';
    month = '12';
    day = '01';

    mdContent = '';

    constructor(private http: HttpClient) {}

    changeDate() {
        this.http.get(`api/v1/md/${this.year}/${this.month}/${this.day}`, { responseType: 'text' }).subscribe((res) => {
            console.log(res);
            this.mdContent = res;
        });
    }

    save() {
        const body = {
            year: this.year,
            month: this.month,
            day: this.day,
            mdContent: this.mdContent
        };
        this.http.post(`api/v1/md`, body).subscribe((res)=>{
            console.log(res);
        });        
    }
}
