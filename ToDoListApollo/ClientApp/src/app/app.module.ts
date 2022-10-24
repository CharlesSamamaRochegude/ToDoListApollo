import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Import de nos propres components
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

import { TacheComponent } from './tache/tache.component';
import { ListeComponent } from './liste/liste.component';
import { MainComponent } from './main/main.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { CreateurListeComponent } from './createur-liste/createur-liste.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    TacheComponent,
    ListeComponent,
    MainComponent,
    UtilisateurComponent,
    CreateurListeComponent
  ],
  imports: [ 
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: ListeComponent, pathMatch: 'full' },
      { path: 'details/:id', component: MainComponent },
      { path: 'creation', component: CreateurListeComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
