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
    diary: string;
}

@Component({
    selector: 'app-diary-page',
    templateUrl: './diary-page.component.html',
    styleUrls: ['./diary-page.component.scss'],
})
export class DiaryPageComponent {
    // array of diary information per day
    diaryInfos: DiaryInfo[] = [];

    ngOnInit() {}

    ngAfterViewChecked() {
        console.log('DiaryPageComponent#ngAfterViewChecked()');
        prism.highlightAll();
    }
}
