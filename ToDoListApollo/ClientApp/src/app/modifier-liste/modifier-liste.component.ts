import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Todoliste } from '../list';
import { personne } from '../personne';
import { personneViewModel } from '../PersonneViewModel';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-modifier-liste',
  templateUrl: './modifier-liste.component.html',
  styleUrls: ['./modifier-liste.component.css']
})
export class ModifierListeComponent implements OnInit {
  http: HttpClient;
  baseUrl: string;
  @Input() ToDoListeModif?: Todoliste;
  titre?: string;
  description?: string;
  date?: string | null;
  id: number | undefined;
  personnes: personneViewModel[] | undefined;
  id_personnes: number | undefined;
  selected_personnes: personneViewModel[]  | undefined =[]; // personne rattaché après modification.
  aujourdhui: string | null = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  selected_personnes_mappes?: number[] ;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private datePipe: DatePipe) {
    this.http = http;
    this.baseUrl = baseUrl;
    
  }

  ngOnInit(): void {
     this.selected_personnes  = this.ToDoListeModif?.personneViewModel;

    this.id = this.ToDoListeModif?.id_l;
    this.date = this.ToDoListeModif?.date_echeance_l?.substring(0, 10);
    this.titre = this.ToDoListeModif?.titre_l;
    this.description = this.ToDoListeModif?.description;
    this.getpersonnesviewmodel();
    console.log(this.selected_personnes);
    this.selected_personnes_mappes=this.selected_personnes?.map(p => p.id_p);

  }

  onSubmitForm(): void {
    this.http.post<any>(this.baseUrl + 'home/postmodiftodo/' + this.id, { Titre_l: this.titre, Description: this.description, Date_echeance_l: this.date, Active_l: this.ToDoListeModif?.active_l })
      .subscribe(
        result => {
          this.http.post<any>(this.baseUrl + 'home/postajoutpersonne/' + this.id, this.selected_personnes?.map(p => p.id_p)).subscribe();
          window.location.reload();
        }, error => console.error(error));
    this.ToDoListeModif = undefined;
    
  }
  onSelect(personne: personneViewModel): void {
    
    if (this.selected_personnes != undefined) {
      if (!this.selected_personnes.find(p => p.id_p == personne.id_p)) {
        this.selected_personnes.push(personne);
      }
      else {
        this.selected_personnes.splice(this.selected_personnes.findIndex(p => p.id_p == personne.id_p),1);
      }
    }
  }

  getpersonnesviewmodel(): void {
    this.http.get<personneViewModel[]>(this.baseUrl + 'home/listpersonneviewmodel').subscribe(result => {
      this.personnes = result;
      console.log(this.personnes);
    }, error => console.error(error));
  }

  
}
