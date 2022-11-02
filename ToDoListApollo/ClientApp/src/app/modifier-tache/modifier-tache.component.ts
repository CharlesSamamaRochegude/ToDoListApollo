import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';

// Import de nos propres fichiers
import { Todoliste } from '../list';
import { personne } from '../personne';
import { tache } from '../tache'

@Component({
  selector: 'app-modifier-tache',
  templateUrl: './modifier-tache.component.html',
  styleUrls: ['./modifier-tache.component.css']
})
export class ModifierTacheComponent implements OnInit {
  @Input() Tache?: tache;
  personnes: personne[] | undefined;
  selected_personnes: personne | undefined;
  id: number | undefined;
  id_p: number | undefined;

  constructor() { }
  ngOnInit(): void {
  }

  // Sélection de la personne précise désignée par l'utilisateur
  onSelect(id: number | undefined): void {
    this.id_p = id;
    console.log(this.id_p);
  }
  // lors de l'envoie des données
  onSubmitForm(): void {
  }
}
