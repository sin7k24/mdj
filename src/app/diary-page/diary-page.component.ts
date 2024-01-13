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
import { Overviews } from '../calendar/calendar.component';

@Component({
    selector: 'app-diary-page',
    templateUrl: './diary-page.component.html',
    styleUrls: ['./diary-page.component.scss'],
})
export class DiaryPageComponent {
    html: string;

    // apiUrl: string = '../mdj-server/api/v1/md2html';
    apiUrl: string = 'api/v1/md2html';

    // year: string;

    // month: string;

    diaries: string[];

    overview: Overviews[];

    constructor(private http: HttpClient, private route: ActivatedRoute) {
        this.html = '';
        // this.year = '';
        // this.month = '';
        this.diaries = [];

        this.overview = [];
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

            // console.log(html.split(/(?<=<\/diary>)/g));
            this.diaries = html.split(/(?<=<\/diary>)/g);

            const overviews = [];
            for (let diary of this.diaries) {
                let result: RegExpMatchArray = diary.match(/<h2>(.*?)<\/h2>/g)!;
                // console.log(diary);
                console.log('result', result);
                const headings = result.map((s) => {
                    return s.replace('<h2>', '').replace('</h2>', '');
                });

                const result2: RegExpMatchArray = diary.match(
                    /<diary year="(\d{4})" month="(\d{2})" day="(\d{2})" dow="(.)"/
                )!;
                console.log(result2[1] + result2[2] + result2[3]);
                overviews.push({ yyyymmdd: result2[1] + result2[2] + result2[3], headings: headings });
            }
            this.overview = overviews;
        });
    }
}
