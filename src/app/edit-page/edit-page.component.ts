import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent {
    year = '';
    month = '';
    day = '';

    mdContent = '';

    constructor(private http: HttpClient) {}

    readMarkdown(event: any) {
        this.year = event.year;
        this.month = event.month;
        this.day = event.day;

        console.log(event);
        this.http.get(`api/v1/md/${event.year}/${event.month}/${event.day}`, { responseType: 'text' }).subscribe((res) => {
            console.log(res);
            this.mdContent = res.length != 0 ? res : "まだ日記がありません";
        });
    }

    saveMarkdown() {
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
