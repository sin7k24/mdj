import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import * as prism from 'prismjs';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-diary-page',
    templateUrl: './diary-page.component.html',
    styleUrls: ['./diary-page.component.scss'],
})
export class DiaryPageComponent {
    html: string;

    apiUrl: string = 'api/v1/md2html';

    constructor(private http: HttpClient, private route: ActivatedRoute) {
        this.html = '';
    }

    ngOnInit() {
        const year = this.route.snapshot.paramMap.get('year');
        const month = this.route.snapshot.paramMap.get('month');
        if (year) {
            this.apiUrl += '/' + year;
            if (month) {
                this.apiUrl += '/' + month;
            }
        }
        this.apiUrl + year && year;
        this.http
            .get(this.apiUrl, { responseType: 'text' })
            .subscribe((html) => {
                this.html = html;
            });
    }

    ngAfterViewChecked() {
        prism.highlightAll();
    }
}
