import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
    words: string;

    @Output() searchCompleted = new EventEmitter();

    constructor(private http: HttpClient) {
        this.words = '';
    }

    search(event: KeyboardEvent) {
        console.log(event);
        if (event.key === 'Enter') {
            console.log('sosin');
            const body = {
                words: this.words,
            };
            this.http.post('api/v1/grep', body).subscribe((result) => {
                console.log(result);
                this.searchCompleted.emit(result);
            });
        }
    }
}
