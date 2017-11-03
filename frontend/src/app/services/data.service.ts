import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import {Translation} from "../translation";

@Injectable()
export class DataService {

  private submittedTextSource = new BehaviorSubject<string>('');
  private inputTextSource = new BehaviorSubject<string>('');
  private translationSource = new BehaviorSubject<Translation>({inputText: '', detectedLanguage: '', translatedText: ''});

  currentSubmittedText = this.submittedTextSource.asObservable();
  currentInputText = this.inputTextSource.asObservable();
  currentTranslation = this.translationSource.asObservable();

  constructor(){}

  changeCurrentSubmittedText(submittedText: string) {
    this.submittedTextSource.next(submittedText);
  }
  changeCurrentInputText(inputText: string) {
    this.inputTextSource.next(inputText);
  }
  changeCurrentTranslation(translation: Translation) {
    this.translationSource.next(translation);
  }
}
