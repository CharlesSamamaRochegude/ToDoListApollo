import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Import de nos propres fichiers
import { Todoliste } from './list';
import { LISTE } from './mock_list';

@Injectable({
  providedIn: 'root'
})

export class ListeService {
  getListes(): Observable<Todoliste[]> {
    const lists = of(LISTE);
    return lists;
  }
  getListe(id: number): Observable<Todoliste> {
    const list = LISTE.find(l => l.id === id)!;
    return of(list);
  }
}
