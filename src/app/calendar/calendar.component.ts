import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild, SimpleChanges } from '@angular/core';
import { DiaryInfo } from '../diary-page/diary-page.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
    // nginxで動確用
    // apiUrl: string = '../mdj-server/api/v1/md2html';
    apiUrl: string = 'api/v1/md2html';

    @ViewChild('calendarContainer') calendarContainer!: ElementRef;

    @Output() diaryFetched = new EventEmitter();

    constructor(
        private http: HttpClient,
        private renderer: Renderer2,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        console.log('CalendarComponent#ngOnInit()');
    }

    ngAfterViewInit() {
        console.log("CalendarComponent#ngAfterViewInit()");
    }

    buildCalendar(year: string, month: string) {
        const calendar = this.calendarContainer.nativeElement;
        calendar.innerHTML = '';

        const firstDayOfWeek = new Date(Number(year), Number(month) - 1, 1).getDay();

        const lastDate = new Date(Number(year), Number(month), 0).getDate();

        const days = ['日', '月', '火', '水', '木', '金', '土'];

        // Render day of week
        for (let day of days) {
            const dayDiv = this.renderer.createElement('div');
            this.renderer.addClass(dayDiv, 'calendar__day-of-week');
            const dayText = this.renderer.createText(day);
            this.renderer.appendChild(dayDiv, dayText);
            this.renderer.appendChild(calendar, dayDiv);
        }

        let columnNum = 0;

        // Render previouse month days
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            const date = new Date(Number(year), Number(month) - 1, -i).getDate();
            const dayDiv = this.renderer.createElement('div');
            this.renderer.addClass(dayDiv, 'calendar__other-month-day');
            const dateSpan = this.renderer.createElement('span');
            const dateText = this.renderer.createText(date.toString());
            this.renderer.appendChild(dateSpan, dateText);
            this.renderer.appendChild(dayDiv, dateSpan);
            this.renderer.appendChild(calendar, dayDiv);
            columnNum++;
        }

        // Render monthly days
        for (let i = 1; i <= lastDate; i++) {
            const dayDiv = this.renderer.createElement('div');
            this.renderer.addClass(dayDiv, 'calendar__day');
            this.renderer.setAttribute(dayDiv, 'id', `overview-${year}${month}${('0' + i).slice(-2)}`);
            this.renderer.setAttribute(
                dayDiv,
                'onclick',
                `window.scrollTo({top: document.getElementById(${year}${month}${('0' + i).slice(
                    -2
                )}).getBoundingClientRect().top, behavior: "smooth"})`
            );
            const dateSpan = this.renderer.createElement('span');
            const dateText = this.renderer.createText(i.toString());
            this.renderer.appendChild(dateSpan, dateText);
            this.renderer.appendChild(dayDiv, dateSpan);

            const overviewDiv = this.renderer.createElement('div');
            this.renderer.appendChild(dayDiv, overviewDiv);
            this.renderer.appendChild(calendar, dayDiv);
            columnNum++;
        }

        // Render next month days
        const nextMonthLeft = 7 - (columnNum % 7);
        for (let i = 1; i <= nextMonthLeft; i++) {
            const dayDiv = this.renderer.createElement('div');
            this.renderer.addClass(dayDiv, 'calendar__other-month-day');
            const dateSpan = this.renderer.createElement('span');
            const dateText = this.renderer.createText(i.toString());
            this.renderer.appendChild(dateSpan, dateText);
            this.renderer.appendChild(dayDiv, dateSpan);
            this.renderer.appendChild(calendar, dayDiv);
        }
    }

    appendOverview(yyyymmdd: string, str: string) {
        const overviewDiv = this.calendarContainer.nativeElement.querySelector(`#overview-${yyyymmdd} div`);
        this.renderer.addClass(overviewDiv.parentNode, 'calendar__day--fill');
        const overviewP = this.renderer.createElement('p');
        const overviewText = this.renderer.createText(str);

        overviewP.appendChild(overviewText);
        overviewDiv.appendChild(overviewP);
    }

    changeCalender(event: any) {
        console.log('CalendarComponent#changeCalendar', event.year, event.month);

        this.buildCalendar(event.year, event.month);
        this.router.navigate([`diary/${event.year}/${event.month}`]);

        this.fetchDiary({ year: event.year, month: event.month });
    }

    fetchDiary(param: any) {
        console.log('CalendarComponent#fetchDiary()', param);
        const api = this.apiUrl + '/' + param.year + '/' + param.month;

        this.http.get(api, { responseType: 'text' }).subscribe({
            next: (html) => {
                // TODO: Can't work regex back ref in safari
                // Divide diaries per day
                const diaries = html.split(/(?<=<\/diary>)/g);

                const diaryInfos: DiaryInfo[] = [];
                for (let diary of diaries) {
                    // Identify the date
                    const regexDate = diary.match(/<diary year="(\d{4})" month="(\d{2})" day="(\d{2})" dow="(.)"/)!;
                    const diaryInfo: DiaryInfo = {
                        date: regexDate[1] + regexDate[2] + regexDate[3],
                        year: regexDate[1],
                        month: regexDate[2],
                        day: regexDate[3],
                        dow: regexDate[4],
                        diary: diary,
                    };
                    diaryInfos.push(diaryInfo);

                    // Find headings per day and show on calendar.
                    const regexHeadings: RegExpMatchArray = diary.match(/<h2>.*?<\/h2>/g)!;
                    let headings: string[] = [];
                    if (regexHeadings) {
                        headings = regexHeadings.map((s) => {
                            return s.replace('<h2>', '').replace('</h2>', '');
                        });
                    } else {
                        headings.push(' ');
                    }
                    headings.forEach((heading) => {
                        this.appendOverview(diaryInfo.date, heading);
                    });
                }
                this.diaryFetched.emit(diaryInfos);
            },
            error: (err) => {
                console.log('エラー！！！', err);
                this.diaryFetched.emit([]);
            },
        });
    }
}
