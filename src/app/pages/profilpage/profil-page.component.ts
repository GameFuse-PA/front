import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

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
  constructor(private router: Router) { }

  ngOnInit(): void {
  }


}
