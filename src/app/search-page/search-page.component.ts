import { Component } from '@angular/core';
import { SearchService } from '../search/search.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent {
    results: any;

    constructor(private searchService: SearchService, private router: Router) {
        this.results = [];
    }

    ngOnInit() {
        this.searchService.resultChanged.subscribe((next) => {
            console.log(next);
            this.results = next;
        });
    }

    jump(year: string, month: string, day: string) {
        console.log(year, month, day);
        // this.router.navigate([`diary/${year}/${month}#${year}${month}${day}`]);
        this.router.navigate([`diary/${year}/${month}`]);
    }
}
