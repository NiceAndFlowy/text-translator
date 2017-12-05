import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TranslationService } from '../services/translation.service';
import { Translation } from '../translation';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-translation-query-list',
  templateUrl: './translation-query-list.component.html',
  styleUrls: ['./translation-query-list.component.css']
})
export class TranslationQueryListComponent implements OnInit {
  submitted: string = '';
  translations: Translation[] = [];
  translation: Translation = {
    inputText: '',
    detectedLanguage: '',
    translatedText: ''
  };
  status: string = '';

  constructor(
    private data: DataService,
    private translationService: TranslationService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    //this.data.currentSubmittedText.subscribe(text => this.submitted = text);
    /*
     * this.submitted: derived from query param
     * this.translation: value synched with DataService
     */
    this.submitted = this.route.snapshot.queryParams['submitted'];
    this.data.currentTranslation.subscribe(
      translation => (this.translation = translation)
    );
    this.getTranslations();
    // If recent submission differs from previous & isn't empty
    if (
      this.submitted !== '' &&
      this.submitted !== this.translation.inputText
    ) {
      this.getTranslation();
    }
  }

  goBack(): void {
    this.location.back();
  }

  getTranslation(): void {
    this.translationService
      .getTranslation(`q=${this.submitted}`)
      .then(translation => {
        this.status = 'success';
        this.translation = translation;
        this.newTranslation(this.translation);
      })
      .catch(error => {
        this.status = 'error';
      });
  }

  getTranslations(): void {
    this.translationService
      .getTranslations()
      .then(translations => {
        this.translations = translations;
        this.status = 'success';
      })
      .catch(error => {
        this.status = 'error';
      });
  }

  // Data service member[translation] updater
  newTranslation(translation: Translation) {
    this.data.changeCurrentTranslation(translation);
  }
}
