import {Component, Input, OnInit} from '@angular/core';
import {ImageInputUtils} from "../../../utils/ImageInputUtils";

@Component({
  selector: 'app-change-profil-pic',
  templateUrl: './change-profil-pic.component.html',
  styleUrls: ['./change-profil-pic.component.css']
})
export class ChangeProfilPicComponent implements OnInit {

  picture = {
    picture: ''
  }

  imgCompil = this.image
  constructor(private image: ImageInputUtils) { }

  @Input() profilPicOnServer: string|undefined = undefined;

  ngOnInit(): void {
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
