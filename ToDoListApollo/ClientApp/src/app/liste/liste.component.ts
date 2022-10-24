import { Component, OnInit, Inject } from '@angular/core';
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
  public tache: tache[] = [{id:1,name:"eza",description:"ezae",id_l:2}];
  http: HttpClient;
  baseUrl: String;

  listeSelectionnee?: Todoliste;
  tachesListeSelectionnee?: tache[];


  constructor(private listeService: ListeService, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  ngOnInit(): void {
    this.getListe();
    this.getTACHE();
  }
  gettache(): void {
    this.http.get<tache[]>(this.baseUrl + 'HomeController1').subscribe(result => {
      this.tache = result;
    }, error => console.error(error));
  }

  getTACHE(): void {
    this.tache = this.listeService.gettache();
  }
  // Obtention de la liste des todolistes depuis le service listeService
  getListe(): void {
    this.listeService.getListe().subscribe(liste => this.liste = liste);
  }
  onSelect(todoliste: Todoliste): void {
    this.listeSelectionnee = todoliste;
    this.tachesListeSelectionnee = todoliste.taches;
  }

}



