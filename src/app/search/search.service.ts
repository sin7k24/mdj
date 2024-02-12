import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    resultChanged = new Subject<any>();

    constructor(private http: HttpClient) {}

    search(words: string) {
        const body = {
            words: words,
        };
        this.http.post('api/v1/search', body).subscribe((results) => {
            console.log(results);
            this.resultChanged.next(results);
        });
    }
}
