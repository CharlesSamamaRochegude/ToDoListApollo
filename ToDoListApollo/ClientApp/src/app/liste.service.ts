import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Import de nos propres fichiers
import { Todoliste } from './list';
import { LISTE } from './mock_list';

@Injectable({
  providedIn: 'root'
})

export class ListeService {
  getListes(): Observable<List[]> {
    const lists = of(LISTS);
    return lists;
  }
  getListe(id: number): Observable<List> {
    const list = LISTS.find(l => l.id === id)!;
    return of(list);
  }
}
