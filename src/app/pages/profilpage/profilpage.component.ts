import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profilpagesolo',
  templateUrl: './profilpage.component.html',
  styleUrls: ['./profilpage.component.css']
})
export class ProfilpageComponent implements OnInit {


  firstname: string | null = null;
  lastname: string | null = null;
  email: string | null = null;
  birthdate: string | null = null;
  password: string | null = null;
  confirmPassword: string | null = null;
  hide1: boolean = true;
  hide2: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  submit(): void {
    console.log('submit');
  }


}
