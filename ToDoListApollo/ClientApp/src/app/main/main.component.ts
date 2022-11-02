import { Component, Inject, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

// Import de nos propres fichiers
import { ListeService } from '../liste.service';
import { Todoliste } from '../list';
import { tache } from '../tache';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent {
  @Input() todoliste?: Todoliste;
  @Input() taches?: tache[];
  http: HttpClient;
  baseUrl: String;
  vrai: boolean = false;
  todocrea: Todoliste | undefined;
  tachemodif: tache | undefined;
  active_desactiv_tache: number | undefined;
  active_desactiv_todo: number | undefined;
  liste: Todoliste | undefined;
  todolistemodif: Todoliste | undefined;
  

  constructor(
              private ListeService: ListeService,
    private location: Location,
    private datePipe: DatePipe,
    private HttpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.http = HttpClient;
    this.baseUrl = baseUrl;
  }

  // Lors de la pression du bouton d'ajout de tâches
  onSelectCrea(todo: Todoliste): void {
    if (this.todocrea != null) {
      this.todocrea = undefined;
    } else {
      this.todocrea = todo;
    }
  }
  // Lors de la pression du bouton d'ajout de tâches
  onSelectModif(tache: tache): void {
    if(this.todoliste)
      tache.todoliste = this.todoliste;
    this.tachemodif = tache;
  }
  //active/desactive la todoliste
  onSelectActiveTache(tache: tache): void {
    if (tache.active_l == 0) {
      this.active_desactiv_todo = tache.active_l + 1;
      this.http.post<any>(this.baseUrl + 'home/postactivationtache/' + tache.id_t, this.active_desactiv_todo).subscribe();
    }
    else {
      this.active_desactiv_todo = tache.active_l - 1;
      this.http.post<any>(this.baseUrl + 'home/postactivationtache/' + tache.id_t, this.active_desactiv_todo).subscribe();
    }
  }
  //active/desactive la todoliste
  onSelectActiveToDo(todo: Todoliste): void {
    if (todo.active_l == 0) {
      this.active_desactiv_todo = todo.active_l + 1;
      this.http.post<any>(this.baseUrl + 'home/postactivationtodo/' + todo.id_l, this.active_desactiv_todo).subscribe();
    }
    else {
      this.active_desactiv_todo = todo.active_l - 1;
      this.http.post<any>(this.baseUrl + 'home/postactivationtodo/' + todo.id_l, this.active_desactiv_todo).subscribe();
    }
  }
  onSelectSupprimerToDo(todo: Todoliste): void {
  }
  
  onSelectModifToDo(todo:Todoliste): void {
    this.todolistemodif = todo;
    console.log(this.todolistemodif);
  }
  ngOnChanges(): void {
    this.todolistemodif = undefined;
  }

  // Refresh form
  refreshForm(): void {
    this.todocrea = undefined;
  }
}
