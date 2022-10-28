import { Component, Inject, Input } from '@angular/core';
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
  ToDoListeID: number | undefined;
  vrai: boolean = false;
  todocrea: Todoliste | undefined;
  active_desactiv_tache: number | undefined;
  active_desactiv_todo: number | undefined;
  liste: Todoliste | undefined;

  constructor(private HttpClient: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    this.http = HttpClient;
    this.baseUrl = baseUrl;
  }

  // Lors de la pression du bouton d'ajout de tâches
  onSelect(todo: Todoliste): void {
    this.todocrea = todo;
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
}
