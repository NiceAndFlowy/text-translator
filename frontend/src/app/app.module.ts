import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TranslationFormComponent } from './translation-form/translation-form.component';
import { TranslationQueryListComponent } from "./translation-query-list/translation-query-list.component";

import { AppRoutingModule } from './routes/app-routing.module';
import {TranslationService} from "./services/translation.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    TranslationFormComponent,
    TranslationQueryListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [TranslationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
