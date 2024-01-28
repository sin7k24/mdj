import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { SearchService } from './search.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
    words: string;

    @Output() searchCompleted = new EventEmitter();

    constructor(private router: Router, private searchService: SearchService) {
        this.words = '';
    }

    ngOnInit() {}

    search(event: KeyboardEvent) {
        console.log(event);
        if (event.key === 'Enter') {
            console.log('sosin');
            this.router.navigate(['search']);
            this.searchService.search(this.words);
        }
    }
}
