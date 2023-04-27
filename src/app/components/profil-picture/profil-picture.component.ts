import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-profil-picture',
  templateUrl: './profil-picture.component.html',
  styleUrls: ['./profil-picture.component.css']
})
export class ProfilPictureComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  @Input() profilPictureUrl: string = '';



}
