import { Component, OnInit } from '@angular/core';
import {ImageSettings} from "../../../config/ImageSettings";
import {ConfigServices} from "../../services/configServices";

@Component({
  selector: 'app-profilpagesolo',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.css']
})
export class ProfilPageComponent implements OnInit {


  firstname: string | null = null;
  lastname: string | null = null;
  email: string | null = null;
  birthdate: string | null = null;
  password: string | null = null;
  confirmPassword: string | null = null;
  hide1: boolean = true;
  hide2: boolean = true;

  picture: string = "";
  imgCompil = this.image


  constructor(private image: ImageSettings, private service: ConfigServices) { }

  ngOnInit(): void {


  }


  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  submit(): void {
    console.log('submit');
  }


}
