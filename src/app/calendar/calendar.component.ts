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

    // selected year
    year!: string;

    // selected month
    month!: string;

    // selectable years list
    years!: string[];

    constructor(
        private http: HttpClient,
        private renderer: Renderer2,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.years = [];
    }

    ngOnInit() {
        // TODO: enable config
        const firstYear = 2005;
        const now = new Date();
        // years list
        for (let i = now.getFullYear(); i >= firstYear; i--) {
            this.years.push(i.toString());
        }

        // Get path parameter from ActivatedRoute
        this.year = this.route.snapshot.paramMap.get('year') || '';
        this.month = this.route.snapshot.paramMap.get('month') || '';
        console.log('CalendarComponent#ngOnInit', this.year, this.month);

        // If year and month were not specified
        this.year = this.year.length == 0 ? now.getFullYear().toString() : this.year;
        this.month = this.month.length == 0 ? '0' + (now.getMonth() + 1).toString().slice(-2) : this.month;

        console.log('CalendarComponent#ngOnInit 2', this.year, this.month);
        setTimeout(() => {
            this.changeCalender();
        });
    }

    ngAfterViewInit() {
        console.log('CalendarComponent#ngAfterViewInit');
        const calendar = this.calendarContainer.nativeElement;
        calendar.innerHTML = '';

        const firstDayOfWeek = new Date(Number(this.year), Number(this.month) - 1, 1).getDay();

        const lastDate = new Date(Number(this.year), Number(this.month), 0).getDate();

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

        // render previouse month days
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            const date = new Date(Number(this.year), Number(this.month) - 1, -i).getDate();
            const dayDiv = this.renderer.createElement('div');
            this.renderer.addClass(dayDiv, 'calendar__other-month-day');
            const dateSpan = this.renderer.createElement('span');
            const dateText = this.renderer.createText(date.toString());
            this.renderer.appendChild(dateSpan, dateText);
            this.renderer.appendChild(dayDiv, dateSpan);
            this.renderer.appendChild(calendar, dayDiv);
            columnNum++;
        }

        // render monthly days
        for (let i = 1; i <= lastDate; i++) {
            const dayDiv = this.renderer.createElement('div');
            this.renderer.addClass(dayDiv, 'calendar__day');
            this.renderer.setAttribute(dayDiv, 'id', `overview-${this.year}${this.month}${('0' + i).slice(-2)}`);
            this.renderer.setAttribute(
                dayDiv,
                'onclick',
                `window.scrollTo({top: document.getElementById(${this.year}${this.month}${('0' + i).slice(
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

        // render next month days
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

    private appendOverview(yyyymmdd: string, str: string) {
        const overviewDiv = this.calendarContainer.nativeElement.querySelector(`#overview-${yyyymmdd} div`);
        this.renderer.addClass(overviewDiv.parentNode, 'calendar__day--fill');
        const overviewP = this.renderer.createElement('p');
        const overviewText = this.renderer.createText(str);

        overviewP.appendChild(overviewText);
        overviewDiv.appendChild(overviewP);
    }

    changeCalender() {
        console.log('CalendarComponent#changeCalendar', this.year, this.month);
        this.ngAfterViewInit();
        this.router.navigate([`diary/${this.year}/${this.month}`]);

        this.fetchDiary({ year: this.year, month: this.month });
    }

    prevMonth() {
        const prev = new Date(Number(this.year), Number(this.month) - 2);
        this.year = prev.getFullYear().toString();
        this.month = ('0' + (prev.getMonth() + 1)).slice(-2);

        this.changeCalender();
    }

    nextMonth() {
        const next = new Date(Number(this.year), Number(this.month));
        this.year = next.getFullYear().toString();
        this.month = ('0' + (next.getMonth() + 1)).slice(-2);

        this.changeCalender();
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
                    // identify the date
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

                    // find headings per day and show on calendar.
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
            },
        });
    }
}
