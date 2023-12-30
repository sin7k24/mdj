import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import * as prism from 'prismjs';

@Component({
    selector: 'app-diary-page',
    templateUrl: './diary-page.component.html',
    styleUrls: ['./diary-page.component.scss'],
})
export class DiaryPageComponent {
    html: string;
    constructor(private http: HttpClient) {
        this.html = '';
    }
    ngOnInit() {
        console.log('日記をフェッチ');

        this.http.get('md2html', { responseType: 'text' }).subscribe((html) => {
            console.log(html);
            this.html = html;
        });
    }

    ngAfterViewChecked() {
        prism.highlightAll();
    }
}
