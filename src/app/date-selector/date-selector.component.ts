import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export type Mode = 'month' | 'date';

@Component({
    selector: 'app-date-selector',
    templateUrl: './date-selector.component.html',
    styleUrls: ['./date-selector.component.scss'],
})
export class DateSelectorComponent {
    @Input()
    mode: Mode = 'month';

    // Selected year
    year: string = '';

    // Selected month
    month: string = '';

    // Selected day
    day: string = '';

    // Selectable years list
    years: string[] = [];

    // Selectable days list per month
    daysOfMonth: number = 0;

    // Emit select box changed event to parent component
    @Output() dateChanged = new EventEmitter();

    constructor(private router: Router, private route: ActivatedRoute, private changeDetectionRef: ChangeDetectorRef) {}

    ngOnInit() {
        // TODO: Enable config
        const firstYear = 2005;
        const now = new Date();
        // years list
        for (let i = now.getFullYear(); i >= firstYear; i--) {
            this.years.push(i.toString());
        }

        // Get path parameter from ActivatedRoute
        this.year = this.route.snapshot.paramMap.get('year') || '';
        this.month = this.route.snapshot.paramMap.get('month') || '';
        this.day = this.route.snapshot.paramMap.get('day') || '';
        console.log('DateSelectorComponent#ngOnInit', this.year, this.month);

        // If year and month were not specified
        // this.year = this.year.length == 0 ? now.getFullYear().toString() : this.year;
        // this.month = this.month.length == 0 ? '0' + (now.getMonth() + 1).toString().slice(-2) : this.month;

        this.year = this.year.length == 0 ? '2023' : this.year;
        this.month = this.month.length == 0 ? '12' : this.month;
        this.day = this.day.length == 0 ? '01' : this.day;
    }

    ngAfterViewInit() {
        console.log('DateSelectorComponent#ngAfterViewInit()');
        this.changeCalender();
        this.changeDetectionRef.detectChanges();
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

    prevDay() {
        const prev = new Date(Number(this.year), Number(this.month) - 1, Number(this.day) - 1);
        this.year = prev.getFullYear().toString();
        this.month = ('0' + (prev.getMonth() + 1)).slice(-2);
        this.day = ('0' + prev.getDate()).slice(-2);

        this.changeCalender();
    }

    nextDay() {
        const next = new Date(Number(this.year), Number(this.month) -1, Number(this.day) + 1);
        this.year = next.getFullYear().toString();
        this.month = ('0' + (next.getMonth() + 1)).slice(-2);
        this.day = ('0' + next.getDate()).slice(-2);

        this.changeCalender();
    }

    changeCalender() {
        this.router.navigate([`edit/${this.year}/${this.month}/${this.day}`]);
        const d = new Date(Number(this.year), Number(this.month) , 0);
        this.daysOfMonth = d.getDate();

        this.dateChanged.emit({
            year: this.year,
            month: this.month,
            day: this.day,
        });
    }
}
