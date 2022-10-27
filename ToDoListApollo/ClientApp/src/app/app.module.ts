import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DatePipe, registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';


// Import de nos propres components
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

import { TacheComponent } from './tache/tache.component';
import { ListeComponent } from './liste/liste.component';
import { MainComponent } from './main/main.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { CreateurListeComponent } from './createur-liste/createur-liste.component';
import { CreateurTacheComponent } from './createur-tache/createur-tache.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    TacheComponent,
    ListeComponent,
    MainComponent,
    UtilisateurComponent,
    CreateurListeComponent,
    CreateurTacheComponent,
  ],
  imports: [ 
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatSlideToggleModule,
    RouterModule.forRoot([
      { path: '', component: ListeComponent, pathMatch: 'full' },
      { path: 'details/:id', component: MainComponent },
      { path: 'creation', component: CreateurListeComponent}
    ]),
    BrowserAnimationsModule
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
