import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm-action',
    templateUrl: './confirm-action.component.html',
    styleUrls: ['./confirm-action.component.css'],
})
export class ConfirmActionComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<ConfirmActionComponent>,
    ) {}

    @Output() confirm = new EventEmitter<void>();

    public message: string = '';
    ngOnInit(): void {
        this.buildMessage();
    }

    buildMessage() {
        const action = this.data.action;
        if (action.type == 'CLICK') {
            this.message = 'Etes-vous sûr de vouloir cliquer à cet endroit ?';
        } else if (action.type == 'KEY') {
            this.message = `Etes-vous sûr de vouloir appuyer sur la touche ${action.key} ?`;
        } else if (action.type == 'TEXT') {
            this.message = `Etes-vous sûr de vouloir envoyer "${action.text}" ?`;
        }
    }

    closeDialog() {
        this.dialogRef.close();
    }

    confirmDialog() {
        this.confirm.emit();
        this.dialogRef.close();
    }
}
