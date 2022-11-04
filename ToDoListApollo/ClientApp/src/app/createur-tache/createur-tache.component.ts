import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';

// Import de nos propres fichiers
import { Todoliste } from '../list';
import { personne } from '../personne';
import { tache } from '../tache';

@Component({
  selector: 'app-createur-tache',
  templateUrl: './createur-tache.component.html',
  styleUrls: ['./createur-tache.component.css']
})
export class CreateurTacheComponent implements OnInit {
  @Input() ToDoListeIDverif?: number;
  @Input() ToDoListe?: Todoliste;
  @Input() ListeTaches?: tache[];
  http: HttpClient;
  baseUrl: string;
  personnes: personne[] | undefined;
  selected_personnes: personne | undefined;
  id: number | undefined;
  id_p: number | undefined;

  titre: string;
  date?: string | null;
  aujourdhui: string | null = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private datePipe: DatePipe) {
    this.http = http;
    this.baseUrl = baseUrl;
    this.titre = "";
  }
  ngOnInit(): void {
    this.titre = "";
    this.getpersonnes();
    if (this.ToDoListe) {
      this.date = this.ToDoListe.date_echeance_l?.slice(0, 10);
    }
  }

  // Obtention des personnes que l'on peut assigner à la tâche
  getpersonnes(): void {
    this.personnes = this.ToDoListe?.personneViewModel;
  }
  // Sélection de la personne précise désignée par l'utilisateur
  onSelect(id: number | undefined): void {
    this.id_p = id;
    console.log(this.id_p);
  }
  // Méthode d'envoie à la complétion du formulaire
  onSubmitForm(): void {

    var nouvelleTache;

    this.http.post<any>(this.baseUrl + 'home/posttache/',
      { Titre_t: this.titre, Date_echeance_l: this.date, Active_l: 1, TodoListId: this.ToDoListe?.id_l, PersonneId: this.id_p })
      .subscribe(idResult => {
        console.log(idResult);
        this.http.get<any>(this.baseUrl + 'home/gettachebyid/' + idResult).subscribe(result => {
          console.log(result);
          nouvelleTache = result
          this.ListeTaches?.push(nouvelleTache);
        });
      });

    this.ngOnInit();
  }
}
