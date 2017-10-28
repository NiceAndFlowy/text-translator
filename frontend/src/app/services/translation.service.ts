import {Injectable} from "@angular/core";
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Translation} from "../translation";
import {TRANSLATIONS} from "../mock-translation-queries";

@Injectable()
export class TranslationService {
  private apiUrl = 'api/translations';

  constructor(private http: Http) { }

  // GET request to apiURL
  getTranslations(): Promise<Translation[]> {
    return this.http.get(this.apiUrl)
                    .toPromise()
                    .then(response => response.json().data as Translation[])
                    .catch(this.handleError);
    // Promise.resolve(TRANSLATIONS);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error occured', error);
    return Promise.reject(error.message || error);
  }

}
