import { Component, OnInit } from '@angular/core';
import {ConfigUserServices} from "../../services/configUserServices";
import {ImageInputUtils} from "../../../utils/ImageInputUtils";

@Component({
  selector: 'app-change-user-form',
  templateUrl: './change-user-form.component.html',
  styleUrls: ['./change-user-form.component.css']
})
export class ChangeUserFormComponent implements OnInit {

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

  constructor(private image: ImageInputUtils, private service: ConfigUserServices) { }

  ngOnInit(): void {
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  submit(): void {
    console.log('submit');
  }

}
