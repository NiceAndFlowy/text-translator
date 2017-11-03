import { Component, OnInit } from '@angular/core';
import {TranslationService} from "../services/translation.service";
import { DataService } from "../services/data.service";

@Component({
  selector: 'app-translation-form',
  templateUrl: './translation-form.component.html',
  styleUrls: ['./translation-form.component.css']
})
export class TranslationFormComponent implements OnInit {

  inputText: string = '';
  submittedText = '';

  constructor(private translationService: TranslationService, private data: DataService) { }

  ngOnInit() {
    this.data.currentSubmittedText.subscribe(text => this.submittedText = text);
    this.data.currentInputText.subscribe(text => this.inputText = text);
  }

// DataService member updaters
  newSubmission(inputText) {
    this.data.changeCurrentSubmittedText(inputText);
  }

  saveCurrentInputText(inputText) {
    this.data.changeCurrentInputText(inputText);
  }

  // Form submission
  requestTranslation(): void {
    if (!this.inputText || this.inputText.length === 0)
      return;
    this.submittedText = this.inputText;
    this.translationService.create(this.inputText);
    this.newSubmission(this.inputText);
  }
}
