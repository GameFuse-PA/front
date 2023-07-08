import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
    constructor() {}

    search: string = '';

    ngOnInit(): void {}

    @Output() newValueUser = new EventEmitter<string>();
    @Input() placeholder: string = '';

    emitValue() {
        this.newValueUser.emit(this.search);
    }
}
