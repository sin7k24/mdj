import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild, SimpleChanges } from '@angular/core';
import { DiaryInfo } from '../diary-page/diary-page.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
    @ViewChild('calendarContainer') calendarContainer!: ElementRef;

    @Output() yearAndMonthChanged = new EventEmitter();

    @Input() diaryInfos!: DiaryInfo[];

    // selected year
    @Input() year!: string;

    // selected month
    @Input() month!: string;

    // selectable years list
    years!: string[];

    constructor(private http: HttpClient, private renderer: Renderer2, private router: Router) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['diaryInfos']) {
            console.log('CalendarComponent#ngOnOnChanges 1', changes);
            for (let current of changes['diaryInfos'].currentValue) {
                // console.log('current', current);
                for (let c of current.headings) {
                    this.appendOverview(current.date, c);
                }
            }
        }

        if (changes['year'] || changes['month']) {
            console.log('CalendarComponent#ngOnOnChanges 2', this.year, this.month);    
            // this.ngOnInit();

            // setTimeout(()=>{
            //     this.changeCalender();

            //     // this.calendarContainer.nativeElement.innerHTML = '';
            //     // this.ngAfterViewInit();
            //     // this.yearAndMonthChanged.emit({ year: this.year, month: this.month });

            // });
        }
    }

    ngOnInit() {
        // TODO: enable config
        const firstYear = 2005;

        this.years = [];
        const now = new Date();

        // years list
        for (let i = now.getFullYear(); i >= firstYear; i--) {
            this.years.push(i.toString());
        }

        console.log('CalendarComponent#ngOnInit', this.year, this.month);

        this.year = this.year.length == 0 ? now.getFullYear().toString() : this.year;
        this.month = this.month.length == 0 ? '0' + (now.getMonth() + 1).toString().slice(-2) : this.month;

        console.log('CalendarComponent#ngOnInit 2', this.year, this.month);
        this.yearAndMonthChanged.emit({ year: this.year, month: this.month });

        // this.http.get('api/v1/years', { responseType: 'json' }).subscribe((json: any) => {
        //     console.log(json.years);
        //     this.years = json.years;
        // });
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

        // console.log(firstDayOfWeek, lastDate);
        // console.log(this.year, this.month);

        // this.appendOverview("20231103", "hogehogehogehogehogehogehogehogehogehoge");
        // this.appendOverview("20231103", "ほげほげほげほげほげほげほげほげほげほげほげ");
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
        // this.calendarContainer.nativeElement.innerHTML = '';
        this.ngAfterViewInit();

        this.yearAndMonthChanged.emit({ year: this.year, month: this.month });
        this.router.navigate([`diary/${this.year}/${this.month}`]);

        // this.router.navigate([`diary/${this.year}/${this.month}`]).then(()=>{
        //     window.location.reload();
        // });
        // this.router.navigateByUrl(`/`, { skipLocationChange: true }).then(() => {
        //     this.router.navigate([`diary/${this.year}/${this.month}`]);
        // });
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
}
