import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { observable, Observable, of } from 'rxjs';

// Import de nos propres fichiers
import { Todoliste } from './list';
import { tache } from './tache';

@Injectable({
  providedIn: 'root'
})

export class ListeService {
  tache: tache[] =[] ;
  http: HttpClient;
  baseUrl: String;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  gettache(id: number): Observable<tache[]> {
    return this.http.get<tache[]>(this.baseUrl + 'home/listTache/' + id);
  }

  getListe(): Observable<Todoliste[]> {
    var requeteTodoliste = this.http.get<Todoliste[]>(this.baseUrl + 'home/list');

    return requeteTodoliste;
  }
}
