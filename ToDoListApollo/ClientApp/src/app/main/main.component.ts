import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

// Import de nos propres fichiers
import { ListeService } from '../liste.service';
import { Todoliste } from '../list';
import { tache } from '../tache';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent /*implements OnInit*/ {
  liste: Todoliste | undefined;
  tache: tache[] = [];
  @Input() todoliste?: Todoliste;
  @Input() taches?: tache[];

  constructor(private route: ActivatedRoute,
              private ListeService: ListeService,
              private location: Location
            ) { }
  //ngOnInit(): void {
  //  this.getToDoListe();
  //  this.getTache();
  //}
  //// Obtention de la todoliste voulue
  //getToDoListe(): void {
  //  const id = Number(this.route.snapshot.paramMap.get('id'));
  //  this.ListeService.getTodoliste(id).subscribe(liste => this.liste = liste);
  //}

  //getTache(): void {
  //  if (this.todoliste) {
  //    this.tache = this.todoliste.taches;
  //  }
  //}
}
