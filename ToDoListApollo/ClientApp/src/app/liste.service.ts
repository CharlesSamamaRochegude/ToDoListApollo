import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Import de nos propres fichiers
import { Todoliste } from './list';
import { LISTE } from './mock_list';
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

  gettache(): tache[] {
    this.http.get<tache[]>(this.baseUrl + 'HomeController1').subscribe(result => {
      this.tache = result;
    }, error => console.error(error));

    return this.tache;
  }
  getListe(): Observable<Todoliste[]> {
    const liste = of(LISTE);
    return liste;
  }
  getTodoliste(id: number): Observable<Todoliste> {
    const todoliste = LISTE.find(l => l.id === id)!;
    return of(todoliste);
  }
}
