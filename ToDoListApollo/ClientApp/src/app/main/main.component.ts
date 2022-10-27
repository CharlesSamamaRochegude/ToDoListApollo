import { Component, Inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';

// Import de nos propres fichiers
import { ListeService } from '../liste.service';
import { Todoliste } from '../list';
import { tache } from '../tache';
import { HttpClient } from '@angular/common/http';

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
  todocrea: number | undefined;
  activve: number | undefined;
  liste: Todoliste | undefined;
  tache: tache[] = [];

  constructor(private route: ActivatedRoute,
              private ListeService: ListeService,
    private location: Location,
    private datePipe: DatePipe,
    private HttpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.http = HttpClient;
    this.baseUrl = baseUrl;
  }

  onSelect(todo: Todoliste): void {
    this.todocrea = todo.id_l;
  }

  onSelectActive(tache: tache): void {
    this.activve = tache.active_l + 1;
    this.http.post<any>(this.baseUrl + 'home/postactivationtache/' + tache.id_t, this.activve ).subscribe();
    console.log(tache.active_l, tache.id_t);
  }
  onSelectDesactive(tache: tache): void {
    this.activve = tache.active_l - 1;
    this.http.post<any>(this.baseUrl + 'home/postactivationtache/' + tache.id_t, this.activve).subscribe();
    console.log(tache.active_l, tache.id_t);
  }
}
