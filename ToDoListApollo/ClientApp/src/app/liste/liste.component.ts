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
  public tache: tache[] = [];



  constructor(private listeService: ListeService,http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<tache[]>(baseUrl + 'HomeController1').subscribe(result => {
      this.tache = result;
    }, error => console.error(error));
  }

  ngOnInit(): void {
    this.getListe();
    
  }

  // Obtention de la liste des todolistes depuis le service listeService
  getListe(): void {
    this.listeService.getListe().subscribe(liste => this.liste = liste);
  }
}



