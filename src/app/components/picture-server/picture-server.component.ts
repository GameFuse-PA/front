import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-picture-server',
    templateUrl: './picture-server.component.html',
    styleUrls: ['./picture-server.component.css'],
})
export class PictureServerComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    @Input() pictureServerUrl: string = '';
}
