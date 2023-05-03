import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profilpagesolo',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.css']
})
export class ProfilPageComponent implements OnInit {

  user = {
    password: '',
    checkPassword: ''
  }
  constructor() { }

  ngOnInit(): void {


  }


}
