import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    @Output() newValueUser = new EventEmitter<string>();
    @Input() placeholder: string = '';

    getValue(value: string) {
        this.newValueUser.emit(value);
    }
}
