import { Component, OnInit } from '@angular/core';
import {TranslationService} from "../services/translation.service";
import {Translation} from "../translation";

@Component({
  selector: 'app-translation-query-list',
  templateUrl: './translation-query-list.component.html',
  styleUrls: ['./translation-query-list.component.css']
})
export class TranslationQueryListComponent implements OnInit {
  translations: Translation[] = [];

  constructor(private translationService: TranslationService) {}

  getTranslations(): void {
    this.translationService.getTranslations().then(translations => this.translations = translations);
  }
  ngOnInit(): void {
    this.getTranslations();
  }

}
