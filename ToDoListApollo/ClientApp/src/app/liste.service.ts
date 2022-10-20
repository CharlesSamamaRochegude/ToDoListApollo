import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Import de nos propres fichiers
import { Todoliste } from './list';
import { LISTE } from './mock_list';

@Injectable({
  providedIn: 'root'
})

export class ListeService {
  constructor() { }

  // M�thode d'obtention de la liste des todolistes
  getHeroes(): Observable<Todoliste[]> {
    const liste = of(LISTE);
    return liste;
  }
  getListe(id: number): Observable<Todoliste> {
    const list = LISTE.find(l => l.id === id)!;
    return of(list);
  }
}
