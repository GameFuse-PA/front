import {Injectable} from "@angular/core";
import {HttpClient, HttpContext, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {NO_AUTH} from "./request.interceptor";
import {User} from "../models/user.model";


const URL = environment.apiUrl + "/profil/";
/* const httpOptions = {
  context: new HttpContext().set(NO_AUTH, true)
}; */

@Injectable({
  providedIn: 'root'
})
export class ConfigUserServices {

  constructor(private http: HttpClient) {
  }

  updateProfil(token: string, user: User) {
    const headers = {
      headers: new HttpHeaders({'Content-Type': 'Application/json', 'Authorization': `Bearer ${token}`})
    }
    return this.http.put(`${URL}/update`, user, headers)
  }

  registerImg(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData()
    formData.append('file', fileToUpload)
    return this.http.post(`${URL}/saveImg/saveimage`, formData)
  }

  getProfilPicture(token: string): Observable<any> {
    const headers = {
      headers: new HttpHeaders({'Content-Type': 'Application/json', 'Authorization': `Bearer ${token}`})
    }
    return this.http.get(`${URL}/saveImg/getimage`, headers)
  }

}
