import {ConfigServices} from "../app/services/configServices";
import {Injectable} from "@angular/core";


@Injectable({providedIn: 'root'})
export class ImageSettings {

  FileUpload: File | null = null


  constructor(private services: ConfigServices) {

  }

  handleFileInput(files: Event) {
    const file = (files.target as HTMLInputElement).files as FileList
    this.FileUpload = file.item(0)
    console.log(this.FileUpload)
  }


}
