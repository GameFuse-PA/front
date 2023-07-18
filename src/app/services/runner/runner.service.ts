import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

const URL = environment.apiUrl + '/game-sessions';

@Injectable({
    providedIn: 'root',
})
export class RunnerService {
    constructor(private http: HttpClient) {}

    retrieveState(gameSessionId: string) {
        return this.http.get(`${URL}/${gameSessionId}/runner`);
    }

    sendAction(gameSessionId: string, action: any) {
        return this.http.post(`${URL}/${gameSessionId}/runner`, action);
    }

    buildHtml(json: any) {
        let html = `<svg width="${json.width}" height="${json.height}">`;

        json.content.forEach((element: any) => {
            let attributes = '';

            for (const [key, value] of Object.entries(element)) {
                if (key == 'tag' || key == 'content') {
                    continue;
                }

                attributes += `${key}="${value}"`;
            }

            html += `<${element.tag} ${attributes}`;

            if (element.content) {
                html += `>${element.content}</${element.tag}>`;
            } else {
                html += `/>`;
            }
        });

        html += '</svg>';

        return html;
    }
}
