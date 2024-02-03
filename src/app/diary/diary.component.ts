import { Component, Input, SimpleChanges } from '@angular/core';
import { DiaryInfo } from '../diary-page/diary-page.component';

@Component({
    selector: 'app-diary',
    templateUrl: './diary.component.html',
    styleUrls: ['./diary.component.scss'],
})
export class DiaryComponent {
    @Input() diaryInfo!: DiaryInfo;

    edit() {
        console.log("edit");
    }

    toTop() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
}
