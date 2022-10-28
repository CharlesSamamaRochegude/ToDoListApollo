import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Todoliste } from '../list';
import { personne } from '../personne';

@Component({
  selector: 'app-createur-tache',
  templateUrl: './createur-tache.component.html',
  styleUrls: ['./createur-tache.component.css']
})
export class CreateurTacheComponent implements OnInit {
  @Input() ToDoListeIDverif?: number;
  @Input() ToDoListe?: Todoliste;
  @Input() vrai?: boolean;
  http: HttpClient;
  baseUrl: string;
  personnes: personne[] | undefined;
  selected_personnes: personne | undefined;
  id: number | undefined;
  id_p: number | undefined;

  titre?: string;
  date?: string | null;
  aujourdhui: string | null = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private datePipe: DatePipe) {
    this.http = http;
    this.baseUrl = baseUrl;
  }
  ngOnInit(): void {
    this.getpersonnes();
    if (this.ToDoListe) {
      this.date = this.ToDoListe.date_echeance_l?.slice(0, 10);
    }
  }

  // Méthode d'envoie à la complétion du formulaire
  onSubmitForm(): void {
    this.http.post<any>(this.baseUrl + 'home/posttache/',
      { Titre_t: this.titre, Date_echeance_l: this.date, Active_l: 1, TodoListId: this.ToDoListe?.id_l, PersonneId: this.id_p })
      .subscribe();
  }
  // Obtention des personnes que l'on peut assigner à la tâche
  getpersonnes(): void {
    this.http.get<personne[]>(this.baseUrl + 'home/listpersonne').subscribe(result => {
      this.personnes = result;
    }, error => console.error(error));
  }
  // Sélection de la personne précise désignée par l'utilisateur
  onSelect(id: number | undefined): void {
    this.id_p = id;
    console.log(this.id_p);
  }
}
