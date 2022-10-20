import { Injectable } from '@angular/core';
import { List } from './list';
import { LISTS } from './mock_list';
import { Observable, of } from 'rxjs';

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
  constructor() { }
}
