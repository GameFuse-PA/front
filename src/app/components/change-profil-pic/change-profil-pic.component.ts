import { Component, Input, OnInit } from '@angular/core';
import { ImageInputUtils } from '../../../utils/ImageInputUtils';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfilService } from '../../services/profil/profil.service';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user.model';
import { FileModel } from '../../models/file.model';

@Component({
    selector: 'app-change-profil-pic',
    templateUrl: './change-profil-pic.component.html',
    styleUrls: ['./change-profil-pic.component.css'],
})
export class ChangeProfilPicComponent implements OnInit {
    picture: FileModel = {
        picture: undefined,
    };
    pictureURL: any;
    ok: string | undefined = undefined;
    error: string | undefined = undefined;

    isLoading: boolean = false;

    imgCompil = this.image;
    constructor(
        private image: ImageInputUtils,
        private sanitizer: DomSanitizer,
        private profilService: ProfilService,
        private authService: AuthService,
    ) {}

    @Input() profilPicOnServer: string | undefined = undefined;

    ngOnInit(): void {}

    getValue(event: Event): File {
        const file = (event.target as HTMLInputElement).files as FileList;
        this.pictureURL = this.sanitizer.bypassSecurityTrustResourceUrl(
            URL.createObjectURL(file.item(0)!.slice()),
        );
        return file.item(0)!;
    }

    submitFile(): void {
        this.error = undefined;
        if (!this.imgCompil.FileUpload) {
            this.error = 'Veuillez sélectionner une image';
            return;
        }
        this.isLoading = true;
        this.profilService.uploadImage(this.imgCompil.FileUpload).subscribe({
            next: (value: any) => {
                this.isLoading = false;
                this.ok = 'Image enregistrée';

                const user: User = JSON.parse(localStorage.getItem('user') as string);
                user.avatar = { location: value.pic };
                localStorage.setItem('user', JSON.stringify(user));
                this.authService.user = user;

                setTimeout(() => {
                    this.ok = undefined;
                }, 3000);
            },
            error: (err) => {
                this.isLoading = false;
                this.error = err.message;
            },
        });
    }
}
