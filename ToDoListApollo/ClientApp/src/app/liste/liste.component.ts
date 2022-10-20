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
  liste: Todoliste[] = [];

  constructor(private listeService: ListeService) { }

  ngOnInit(): void {
    this.getListe();
  }

  // Obtention de la liste des todolistes depuis le service listeService
  getListe(): void {
    this.listeService.getHeroes().subscribe(liste => this.liste = liste);
  }
}
