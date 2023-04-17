import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ConfigUserServices {

  url = 'http://localhost:3000'

  constructor(private http: HttpClient) {
  }

  registerImg(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData()
    formData.append('file', fileToUpload)
    return this.http.post(`${this.url}/saveImg/saveimage`, formData)
  }

  getProfilPicture(token: string): Observable<any> {
    const headers = {
      headers: new HttpHeaders({'Content-Type': 'Application/json', 'Authorization': `Bearer ${token}`})
    }
    return this.http.get(`${this.url}/saveImg/getimage`, headers)
  }

}
