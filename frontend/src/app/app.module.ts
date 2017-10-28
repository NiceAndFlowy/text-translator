import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import { AppRoutingModule } from './routes/app-routing.module';

import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { TranslationFormComponent } from './translation-form/translation-form.component';
import { TranslationQueryListComponent } from "./translation-query-list/translation-query-list.component";
import {TranslationService} from "./services/translation.service";

@NgModule({
  declarations: [
    AppComponent,
    TranslationFormComponent,
    TranslationQueryListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [TranslationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
