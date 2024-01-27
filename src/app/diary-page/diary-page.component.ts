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
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

export interface DiaryInfo {
    date: string;
    year: string;
    month: string;
    day: string;
    dow: string;
    headings: string[];
    diary: string;
}
@Component({
    selector: 'app-diary-page',
    templateUrl: './diary-page.component.html',
    styleUrls: ['./diary-page.component.scss'],
})
export class DiaryPageComponent {
    // nginxで動確用
    // apiUrl: string = '../mdj-server/api/v1/md2html';
    apiUrl: string = 'api/v1/md2html';

    // array of diary information per day
    diaryInfos: DiaryInfo[];

    // year path parameter
    year = '';

    // month path parameter
    month = '';

    constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
        this.diaryInfos = [];
    }

    ngOnInit() {
        this.year = this.route.snapshot.paramMap.get('year') || '';
        this.month = this.route.snapshot.paramMap.get('month') || '';

        console.log('DiaryPageComponent#ngOnInit 1', this.year, this.month);
        // this.router.events.subscribe((value) => {
        //     if (value instanceof NavigationEnd) {
        //         // console.log(value);
        //         const param = {
        //             year: this.route.snapshot.paramMap.get('year') || '',
        //             month: this.route.snapshot.paramMap.get('month') || '',
        //         };
        //         this.year = param.year;
        //         this.month = param.month;
        //         console.log('DiaryPageComponent#ngOnInit 2', this.year, this.month);
        //         // this.fetchDiary({year: this.year, month: this.month});
        //     }
        // });
    }

    ngAfterViewChecked() {
        console.log("DiaryPageComponent#ngAfterViewChecked()", this.year, this.month);
        prism.highlightAll();
    }

    fetchDiary(param: any) {
        console.log('DiaryPageComponent#fetchDiary', param);
        const api = this.apiUrl + '/' + param.year + '/' + param.month;

        this.http.get(api, { responseType: 'text' }).subscribe({
            next: (html) => {
                // TODO: can't work regex back ref in safari
                // divide diaries per day
                const diaries = html.split(/(?<=<\/diary>)/g);

                const diaryInfos: DiaryInfo[] = [];
                for (let diary of diaries) {
                    // find headings per day
                    const regexHeadings: RegExpMatchArray = diary.match(/<h2>.*?<\/h2>/g)!;
                    let headings: string[] = [];
                    if (regexHeadings) {
                        headings = regexHeadings.map((s) => {
                            return s.replace('<h2>', '').replace('</h2>', '');
                        });
                    } else {
                        headings.push(' ');
                    }

                    // identify the date
                    const regexDate = diary.match(/<diary year="(\d{4})" month="(\d{2})" day="(\d{2})" dow="(.)"/)!;
                    const diaryInfo: DiaryInfo = {
                        date: regexDate[1] + regexDate[2] + regexDate[3],
                        year: regexDate[1],
                        month: regexDate[2],
                        day: regexDate[3],
                        dow: regexDate[4],
                        headings: headings,
                        diary: diary,
                    };
                    diaryInfos.push(diaryInfo);
                }
                this.diaryInfos = diaryInfos;
            },
            error: (err) => {
                console.log('エラー！！！', err);
                this.diaryInfos = [];
            },
        });
    }
}
