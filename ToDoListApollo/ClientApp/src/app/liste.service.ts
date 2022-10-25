import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { observable, Observable, of } from 'rxjs';

// Import de nos propres fichiers
import { Todoliste } from './list';
import { tache } from './tache';
import { TACHE } from './mock_tache';

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

  gettache(): Observable<tache[]> {
    return this.http.get<tache[]>(this.baseUrl + 'Home');
  }
  gettache2(): Promise<tache[] | undefined> {
    return this.http.get<tache[]>(this.baseUrl + 'Home').toPromise();
  }
  getListe(): Observable<Todoliste[]> {
    const requeteTodoliste = this.http.get<Todoliste[]>(this.baseUrl + 'home/list');

    requeteTodoliste.forEach(function (liste) {
      liste.forEach(function (todo) {
        todo.taches = [];
        TACHE.forEach(function (tache) {
          if (tache.id_l == todo.id_l) {
            //console.log(tache);
            //console.log(todo);
            todo.taches.push(tache);
          }
        })
      })
    })
    return requeteTodoliste;
  }
}
