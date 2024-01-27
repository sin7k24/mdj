import { Component } from '@angular/core';
import { SearchService } from '../search/search.service';

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent {
    results: any;

    constructor(private searchService: SearchService) {
        this.results = [];
    }

    ngOnInit() {
        this.searchService.resultChanged.subscribe((next)=>{
            console.log(next);
            this.results = next;
        });
    }

    jump(file: string) {
        console.log(file);
    }
}
