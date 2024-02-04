import { Component, Input, SimpleChanges } from '@angular/core';
import { DiaryInfo } from '../diary-page/diary-page.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-diary',
    templateUrl: './diary.component.html',
    styleUrls: ['./diary.component.scss'],
})
export class DiaryComponent {
    @Input() diaryInfo!: DiaryInfo;

    constructor(private router: Router) {}

    edit() {
        this.router.navigate([`edit/${this.diaryInfo.year}/${this.diaryInfo.month}/${this.diaryInfo.day}`]);
    }

    toTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
