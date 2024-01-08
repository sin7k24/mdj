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

    // apiUrl: string = '../mdj-server/api/v1/md2html';
    apiUrl: string = 'api/v1/md2html';

    year: string;

    month: string;

    constructor(private http: HttpClient, private route: ActivatedRoute) {
        this.html = '';
        this.year = '';
        this.month = '';
    }

    ngOnInit() {
        // this.year = this.route.snapshot.paramMap.get('year') || '';
        // this.month = this.route.snapshot.paramMap.get('month') || '';
        // let api = this.apiUrl;
        // if (this.year) {
        //     api += '/' + this.year;
        //     if (this.month) {
        //         api += '/' + this.month;
        //     }
        // }
        // this.http.get(api, { responseType: 'text' }).subscribe((html) => {
        //     this.html = html;
        // });
    }

    ngAfterViewChecked() {
        prism.highlightAll();
    }

    fetchDiary(e: any) {
        console.log(e);
        const api = this.apiUrl + '/' + e.year + '/' + e.month;
        this.http.get(api, { responseType: 'text' }).subscribe((html) => {
            this.html = html;
        });

    }
}
