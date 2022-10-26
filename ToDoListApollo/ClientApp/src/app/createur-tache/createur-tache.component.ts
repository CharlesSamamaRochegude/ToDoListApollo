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
  @Input() ToDoListeID?: number;
  @Input() vrai?: boolean;
  http: HttpClient;
  baseUrl: string;
  personnes: personne[] | undefined;
  selected_personnes: personne | undefined;
  id: number | undefined;

  titre?: string;
  date?: string | null;
  aujourdhui: string | null = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private datePipe: DatePipe) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  ngOnInit(): void {
    this.getpersonnes();
    this.date = this.aujourdhui;
  }

  onSubmitForm(): void {
    console.log(this.selected_personnes);
    this.http.post<any>(this.baseUrl + 'home/posttache/',
      { Titre_t: this.titre, Date_echeance_l: this.date, Active_l: 1, TodoListId: this.ToDoListeID, PersonneId: this.selected_personnes?.id_p })
      .subscribe();
    console.log(this.titre);
    console.log(this.date);
  }
  
  getpersonnes(): void {
    this.http.get<personne[]>(this.baseUrl + 'home/listpersonne').subscribe(result => {
      this.personnes = result;
    }, error => console.error(error));
  }

  onSelect(personne: personne): void {
    this.selected_personnes = personne;
    console.log(this.selected_personnes);
  }
}
