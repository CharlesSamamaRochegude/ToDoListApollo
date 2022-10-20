import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Import de nos propres fichiers
import { Todoliste } from './list';
import { LISTE } from './mock_list';

@Injectable({
  providedIn: 'root'
})

export class ListeService {
  getListe(): Observable<Todoliste[]> {
    const liste = of(LISTE);
    return liste;
  }
  getTodoliste(id: number): Observable<Todoliste> {
    const todoliste = LISTE.find(l => l.id === id)!;
    return of(todoliste);
  }
}
