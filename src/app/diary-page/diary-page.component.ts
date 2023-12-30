import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import * as prism from 'prismjs';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';

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

        this.http.get('api/v1/md2html', { responseType: 'text' }).subscribe((html) => {
            this.html = html;
        });
    }

    ngAfterViewChecked() {
        prism.highlightAll();
    }
}
