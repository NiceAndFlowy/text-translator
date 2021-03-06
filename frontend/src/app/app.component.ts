import { Component } from '@angular/core';
import {TranslationFormComponent} from "./translation-form/translation-form.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  entryComponents: [TranslationFormComponent]
})

export class AppComponent {
  title = 'Translation App';
  submittedText = '';
}
