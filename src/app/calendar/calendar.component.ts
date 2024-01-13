import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild, SimpleChanges } from '@angular/core';

export interface Overviews {
    yyyymmdd: string
    headings: string[]
}

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
    @ViewChild('calendarContainer') calendarContainer!: ElementRef;

    @Output() yearAndMonthChanged = new EventEmitter();

    @Input() overviews!: Overviews[];

    // selected year
    year!: string;

    // selected month
    month!: string;

    // selectable year list
    years!: string[];

    constructor(private http: HttpClient, private renderer: Renderer2) {
        // this.overviews = [];
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
        console.log("changes['overviews'].currentValue", changes['overviews'].currentValue);

        for(let current of changes['overviews'].currentValue) {
            console.log("current", current);
            for(let c of current.headings) {
            this.appendOverview(current.yyyymmdd, c);
            }
        }

    }

    ngOnInit() {
        // TODO: enable config
        const firstYear = 2005;

        this.years = [];
        const date = new Date();
        for (let i = date.getFullYear(); i >= firstYear; i--) {
            this.years.push(i.toString());
        }

        // this.year = date.getFullYear().toString();
        // this.month = "0" + (date.getMonth()+1).toString().slice(-2);
        this.year = '2023';
        this.month = '12';

        this.yearAndMonthChanged.emit({ year: this.year, month: this.month });

        // this.http.get('api/v1/years', { responseType: 'json' }).subscribe((json: any) => {
        //     console.log(json.years);
        //     this.years = json.years;
        // });
    }

    ngAfterViewInit() {
        const calendar = this.calendarContainer.nativeElement;

        const firstDayOfWeek = new Date(Number(this.year), Number(this.month) - 1, 1).getDay();

        const lastDate = new Date(Number(this.year), Number(this.month), 0).getDate();

        const days = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];

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
                `window.scrollTo({top: document.getElementById(${this.year}${this.month}${('0' + i).slice(-2)}).getBoundingClientRect().top, behavior: "smooth"})`
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
        const overviewP = this.renderer.createElement('p');
        const overviewText = this.renderer.createText(str);

        overviewP.appendChild(overviewText);
        overviewDiv.appendChild(overviewP);
    }

    changeCalender() {
        console.log(this.year, this.month);
        this.calendarContainer.nativeElement.innerHTML = '';
        this.ngAfterViewInit();

        this.yearAndMonthChanged.emit({ year: this.year, month: this.month });
    }
}
