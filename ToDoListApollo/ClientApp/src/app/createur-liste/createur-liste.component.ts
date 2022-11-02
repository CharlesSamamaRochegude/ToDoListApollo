import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location, DatePipe } from '@angular/common';

// Import de nos propres fichiers
import { Router } from '@angular/router';
import { personne } from '../personne';


@Component({
  selector: 'app-createur-liste',
  templateUrl: './createur-liste.component.html',
  styleUrls: ['./createur-liste.component.css']
})
export class CreateurListeComponent implements OnInit {
  titre?: string;
  description?: string;
  date?: string | null;
  http: HttpClient ;
  baseUrl: string;
  aujourdhui: string | null = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  personnes: personne[] | undefined;
  selected_personnes: personne[] = [];
  personne: personne | undefined;
  id: number | undefined;
  

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private datePipe: DatePipe, private location: Location, private router: Router) { 
    this.http = http;
    this.baseUrl = baseUrl;
}

  ngOnInit(): void {
    this.date = this.aujourdhui;
    this.getpersonnes();
  }

  // Obtention des personnes qu'il est possible d'assigner à la liste
  getpersonnes(): void {
    this.http.get<personne[]>(this.baseUrl + 'home/listpersonne').subscribe(result => {
      this.personnes = result;
    }, error => console.error(error));
  }
  // Obtention des personnes sélectionnées par l'utilisateur
  onSelect(personne: personne): void {
    if (!this.selected_personnes.includes(personne)) {
      this.selected_personnes.push(personne);
    }
  }
  // Envoi des données vers la base de données, et retour sur la page d'accueil
  onSubmitForm(): void {
    this.http.post<any>(this.baseUrl + 'home/posttodo/', { Titre_l: this.titre, Description: this.description, Date_echeance_l: this.date, Active_l: 1 })
      .subscribe(result => {
        this.id = result;
        this.http.post<any>(this.baseUrl + 'home/postajoutpersonne/' + this.id, this.selected_personnes.map(p => p.id_p)).subscribe();
      }, error => console.error(error));
    console.log(this.titre);
    console.log(this.date);
    this.router.navigateByUrl('/');
  }
}
