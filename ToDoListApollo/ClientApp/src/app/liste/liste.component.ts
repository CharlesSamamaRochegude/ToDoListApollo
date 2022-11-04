import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Import de nos propres fichiers
import { Todoliste } from '../list'
import { ListeService } from '../liste.service';
import { tache } from '../tache';


@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})

export class ListeComponent implements OnInit {
  liste: Todoliste[] = [];
  http: HttpClient;
  baseUrl: String;
  active_desactiv_todo: number | undefined;

  button_selected: string[] = [];
  button_selected2: string[] = [];
  listeSelectionnee?: Todoliste;
  tachesListeSelectionnee: tache[] = [];


  constructor(private listeService: ListeService, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
  }
  ngOnInit(): void {
    this.getListe();
  }

  // Obtention de la liste des todolistes depuis le service listeService
  getListe(): void {
    this.listeService.getListe().subscribe(
      liste => {
        this.liste = liste;
        for (let i = 0; i < this.liste.length; i++) {
          this.button_selected[i] = "false";
        }
        console.log(this.button_selected);
      }
    );
  }
  // Lors du clique d'une todoliste, on affiche ses informations
  onSelect(todoliste: Todoliste, i:number): void {
    this.listeSelectionnee = todoliste;
    this.listeService.gettache(todoliste.id_l).subscribe(result => {
      this.tachesListeSelectionnee = result;
    }, error => console.error(error));
    for (let j = 0; j < this.button_selected.length; j++) {
      this.button_selected[j] = "false";
    }
    this.button_selected[i] = "true";
    for (let j = 0; j < this.button_selected2.length; j++) {
      this.button_selected2[j] = "falsee";
    }
    this.button_selected2[i] = "truee";
  }

}
