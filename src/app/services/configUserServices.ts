import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../models/user.model";


const URL = environment.apiUrl + "/me";

@Injectable({
  providedIn: 'root'
})
export class ConfigUserServices {

  constructor(private http: HttpClient) {
  }

  updateProfil(user: User) {
    return this.http.put(`${URL}`, user)
  }

  registerImg(fileToUpload: File) {
    const formData: FormData = new FormData()
    formData.append('file', fileToUpload)
    return this.http.post(`${URL}/saveImg/saveimage`, formData)
  }

  getProfilPicture(token: string) {
    return this.http.get(`${URL}/saveImg/getimage`)
  }

}
