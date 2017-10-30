import { Component, OnInit } from '@angular/core';
import {TranslationService} from "../services/translation.service";

@Component({
  selector: 'app-translation-form',
  templateUrl: './translation-form.component.html',
  styleUrls: ['./translation-form.component.css']
})
export class TranslationFormComponent implements OnInit {
  inputText: string = '';

  constructor(private translationService: TranslationService) { }

  ngOnInit() {
  }

  requestTranslation(): void {
    if (!this.inputText || this.inputText.length === 0)
      return;
    this.translationService.create(this.inputText).then(response => console.log('form: response',response ));
    console.log(this.inputText);
  }
}
