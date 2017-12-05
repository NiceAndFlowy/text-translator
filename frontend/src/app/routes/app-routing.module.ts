import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TranslationFormComponent }   from '../translation-form/translation-form.component';
import {TranslationQueryListComponent} from "../translation-query-list/translation-query-list.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: TranslationFormComponent },
  { path: 'list', component: TranslationQueryListComponent },
  { path: 'translation', component: TranslationQueryListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
