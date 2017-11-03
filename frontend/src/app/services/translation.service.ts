import {Injectable} from "@angular/core";
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Translation} from "../translation";

@Injectable()
export class TranslationService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private translationApiUrl = 'http://localhost:8000/translations/';
  private params = 'q';

  constructor(private http: Http) { }

  // GET request to apiURL
  getTranslations(): Promise<Translation[]> {
    return this.http.get(this.translationApiUrl + this.params)
                    .toPromise()
                    .then(response => response.json() as Translation[])
                    .catch(this.handleError);
    // Promise.resolve(TRANSLATIONS);
  }

  getTranslation(queryParams): Promise<Translation> {
    return this.http.get(this.translationApiUrl + '?' + queryParams)
                    .toPromise()
                    .then(response => response.json() as Translation)
                    .catch(this.handleError);
    // Promise.resolve(TRANSLATIONS);
  }

  create(inputText: string): Promise<Translation> {
    return this.http
      .post(this.translationApiUrl, JSON.stringify({inputText: inputText}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Translation )
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('Error occured', error);
    return Promise.reject(error.message || error);
  }

}
