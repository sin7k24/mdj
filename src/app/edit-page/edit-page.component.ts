import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent {
    year = '';
    month = '';
    day = '';

    mdContent = '';

    @ViewChild('editor') editor!: ElementRef;

    constructor(private http: HttpClient) {}

    readMarkdown(event: any) {
        this.year = event.year;
        this.month = event.month;
        this.day = event.day;

        console.log(event);
        this.http
            .get(`api/v1/md/${event.year}/${event.month}/${event.day}`, { responseType: 'text' })
            .subscribe((res) => {
                console.log(res);
                this.mdContent = res.length != 0 ? res : 'まだ日記がありません';
            });
    }

    saveMarkdown() {
        const body = {
            year: this.year,
            month: this.month,
            day: this.day,
            mdContent: this.mdContent,
        };
        this.http.post(`api/v1/md`, body).subscribe((res) => {
            console.log(res);
        });
    }

    dragOver(evt: DragEvent) {
        evt.preventDefault();
        console.log('drag', evt);
    }

    drop(evt: DragEvent) {
        evt.preventDefault();
        console.log('drop', evt);
        const file = evt.dataTransfer!.files[0];
        console.log(file);

        const formData = new FormData();
        formData.append('upload_file', file);

        this.http.post(`api/v1/img`, formData, { responseType: 'text' }).subscribe((res) => {
            console.log(res);
            const editor = this.editor.nativeElement;
            // カーソルがまだ当たっていない場合は末尾になる
            console.log("editor.selectionStart", editor.selectionStart);
            this.mdContent =
                editor.value.substr(0, editor.selectionStart) +
                `![](${res})` +
                editor.value.substr(editor.selectionStart);
        });
    }
}
