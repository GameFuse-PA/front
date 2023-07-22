import { Component, Input, OnInit } from '@angular/core';
import { ResetPasswordModel } from '../../models/reset-password.model';

@Component({
    selector: 'app-password-field',
    templateUrl: './password-field.component.html',
    styleUrls: ['./password-field.component.css'],
})
export class PasswordFieldComponent implements OnInit {
    @Input() user: ResetPasswordModel | undefined = {};
    hide: boolean = true;
    hide2: boolean = true;

    constructor() {}

    ngOnInit(): void {}
}
