import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-diary',
    templateUrl: './diary.component.html',
    styleUrls: ['./diary.component.scss'],
})
export class DiaryComponent {
    @Input() diary!: string;

    year!: string;

    month!: string;

    day!: string;

    dow!: string;

    ngOnChanges(changes: SimpleChanges) {
        // console.log(changes);
        const html: string = changes['diary'].currentValue;
        // console.log(html);

        const result: RegExpMatchArray = html.match(/<diary year="(\d{4})" month="(\d{2})" day="(\d{2})" dow="(.)"/)!;
        this.year = result[1];
        this.month = result[2];
        this.day = result[3];
        this.dow = result[4];
    }
}
