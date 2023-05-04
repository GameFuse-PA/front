import {Component, Input, OnInit} from '@angular/core';
import {ImageInputUtils} from "../../../utils/ImageInputUtils";
import {DomSanitizer} from "@angular/platform-browser";
import {ProfilService} from "../../services/profil/profil.service";

@Component({
  selector: 'app-change-profil-pic',
  templateUrl: './change-profil-pic.component.html',
  styleUrls: ['./change-profil-pic.component.css']
})
export class ChangeProfilPicComponent implements OnInit {

  picture = {
    picture: ''
  }
  pictureURL: any
  ok: string|undefined = undefined
  error: string|undefined = undefined

  isLoading: boolean = false

  imgCompil = this.image
  constructor(private image: ImageInputUtils, private sanitizer: DomSanitizer, private profilService: ProfilService) { }

  @Input() profilPicOnServer: string|undefined = undefined;

  ngOnInit(): void {
  }

  getValue(event: Event): string {
    const file = (event.target as HTMLInputElement).files as FileList
    this.pictureURL = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file.item(0)!.slice()))
    return (event.target as HTMLInputElement).value;
  }

  submitFile(): void {
    this.isLoading = true
    if (!this.imgCompil.FileUpload) {
      this.error = "Veuillez sélectionner une image"
      return
    }
    this.profilService.uploadImage(this.imgCompil.FileUpload).subscribe({
      next: () => {
        this.isLoading = false
        this.ok = "Image enregistrée, la page va se recharger"
        setTimeout(() => {
          window.location.reload()
        }, 5000)
      },
      error: err => {
        this.isLoading = false
        this.error = err.message
      }
    })
  }

  protected readonly String = String;
}
