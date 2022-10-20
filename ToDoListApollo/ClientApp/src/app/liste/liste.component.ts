import { Component, OnInit } from '@angular/core';

// Import de nos propres fichiers
import { Todoliste } from '../list'
import { ListeService } from '../liste.service';


@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})

export class ListeComponent implements OnInit {
  lists: Todoliste[] = [];

  constructor(private listeService: ListeService) { }

  ngOnInit(): void {
    this.getLists();
  }

  // Obtention de la liste des todolistes depuis le service listeService
  getLists(): void {
    this.listeService.getListes().subscribe(lists => this.lists = lists);
  }
}
