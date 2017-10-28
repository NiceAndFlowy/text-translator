import { Injectable } from "@angular/core";

import { Translation } from "../translation";
import { TRANSLATIONS } from "../mock-translation-queries";

@Injectable()
export class TranslationService {
  getTranslations(): Promise<Translation[]> {
    return Promise.resolve(TRANSLATIONS);
  }

  getTranslationSlowly(): Promise<Translation[]> {
    return new Promise(resolve => {
      setTimeout(()=> resolve(this.getTranslations()), 2000);
    });
  }
}
