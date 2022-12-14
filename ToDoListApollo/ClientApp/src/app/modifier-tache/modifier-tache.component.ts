import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit, OnChanges } from '@angular/core';

// Import de nos propres fichiers
import { Todoliste } from '../list';
import { personne } from '../personne';
import { tache } from '../tache'

@Component({
  selector: 'app-modifier-tache',
  templateUrl: './modifier-tache.component.html',
  styleUrls: ['./modifier-tache.component.css']
})
export class ModifierTacheComponent implements OnChanges {
  @Input() Tache?: tache;
  personnes: personne[] | undefined;
  selected_personnes: personne | undefined;
  http: HttpClient;
  baseUrl: string;

  titreAncien: string | null;
  titre: string | null;
  date: string | null;
  ressource: number | null;
  id_p: number | undefined;
  id: number | undefined;

  aujourdhui: string | null = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private datePipe: DatePipe) {
    this.http = http;
    this.baseUrl = baseUrl;

    this.titreAncien = null;
    this.titre = null;
    this.date = null;
    this.ressource = null;
    this.id = this.Tache?.id_t;
  }
  ngOnChanges(): void {
    this.getPersonnes();
    if (this.Tache) {
      this.titreAncien = this.Tache.titre_t;
      if (this.Tache.date_echeance_l)
        this.date = this.Tache.date_echeance_l.split("T")[0];
      if (this.Tache.personneId)
        this.http.get<personne>(this.baseUrl + 'home/getpersonnebyid/' + this.Tache.personneId).subscribe(result => {
          if (result.id_p)
          this.ressource = result.id_p;
        }, error => console.error(error));
      this.id = this.Tache.id_t;
      this.id_p = this.Tache.personneId;
    }

    console.log('Id select ' + this.ressource);
  }

  // Obtention des personnes que l'on peut assigner à la tâche
  getPersonnes(): void {
    if (this.Tache?.todoliste)
    this.personnes = this.Tache?.todoliste.personneViewModel;
  }
  // Sélection de la personne précise désignée par l'utilisateur
  onSelect(id: number | undefined): void {
    this.id_p = id;
    console.log(this.id_p);
  }
  // lors de l'envoie des données
  onSubmitForm(): void {
    this.http.post<any>(this.baseUrl + 'home/postmodiftache/' + this.id,
      {
        Titre_t: this.titre,
        Date_echeance_l: this.date,
        Active_l: 1,
        TodoListId: 0,
        PersonneId: this.id_p
      }).subscribe(r => {
        window.location.reload();
      });
  }
}
