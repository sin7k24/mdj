import {
    Component,
    ElementRef,
    Input,
    Renderer2,
    ViewChild,
} from '@angular/core';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
    @Input() year!: string;

    @Input() month!: string;

    @ViewChild('calendarContainer') calendarContainer!: ElementRef;

    constructor(private renderer: Renderer2) {}

    ngAfterViewInit() {
        const calendar = this.calendarContainer.nativeElement;

        const firstDayOfWeek = new Date(
            Number(this.year),
            Number(this.month) - 1,
            1
        ).getDay();

        const lastDate = new Date(
            Number(this.year),
            Number(this.month),
            0
        ).getDate();

        const days = ['日', '月', '火', '水', '木', '金', '土'];

        // render day of week
        for (let day of days) {
            const dayDiv = this.renderer.createElement('div');
            this.renderer.addClass(dayDiv, 'calendar__day-of-week');
            const dayText = this.renderer.createText(day);
            this.renderer.appendChild(dayDiv, dayText);
            this.renderer.appendChild(calendar, dayDiv);
        }

        let columnNum = 0;
        for (let i = 0; i < firstDayOfWeek; i++) {
            const dayDiv = this.renderer.createElement('div');
            this.renderer.addClass(dayDiv, 'calendar__day');
            this.renderer.appendChild(calendar, dayDiv);
            columnNum++;
        }

        for (let i = 1; i <= lastDate; i++) {
            const dayDiv = this.renderer.createElement('div');
            this.renderer.addClass(dayDiv, 'calendar__day');
            const dateSpan = this.renderer.createElement('span');
            const dateText = this.renderer.createText(i.toString());
            this.renderer.appendChild(dateSpan, dateText);
            this.renderer.appendChild(dayDiv, dateSpan);
            this.renderer.appendChild(calendar, dayDiv);
            columnNum++;
        }

        const nextMonthLeft = 7 - (columnNum % 7);
        console.log(columnNum);
        console.log("next", nextMonthLeft);
        for (let i = 1; i <= nextMonthLeft; i++) {
            const dayDiv = this.renderer.createElement('div');
            this.renderer.addClass(dayDiv, 'calendar__day');
            const dateSpan = this.renderer.createElement('span');
            const dateText = this.renderer.createText(i.toString());
            this.renderer.appendChild(dateSpan, dateText);
            this.renderer.appendChild(dayDiv, dateSpan);
            this.renderer.appendChild(calendar, dayDiv);
        }

        console.log(firstDayOfWeek, lastDate);
        console.log(this.year, this.month);
    }
}
