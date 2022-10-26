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

  gettache(): Observable<tache[]> {
    return this.http.get<tache[]>(this.baseUrl + 'home');
  }
  gettache2(): Promise<tache[] | undefined> {
    return this.http.get<tache[]>(this.baseUrl + 'home').toPromise();
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
