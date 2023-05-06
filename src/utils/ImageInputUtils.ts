import {ConfigUserServices} from "../app/services/configUserServices";
import {Injectable} from "@angular/core";


@Injectable({providedIn: 'root'})
export class ImageInputUtils {

  FileUpload: File | null = null


  constructor(private services: ConfigUserServices) {

  }

  handleFileInput(files: Event) {
    const file = (files.target as HTMLInputElement).files as FileList
    this.FileUpload = file.item(0)
  }


}
