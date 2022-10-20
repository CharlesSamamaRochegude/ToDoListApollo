import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ListeService } from '../liste.service';
import { List } from '../list';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  liste: List | undefined;
  constructor(
    private route: ActivatedRoute,
    private ListeService: ListeService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getToDoListe();
  }

  getToDoListe(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ListeService.getListe(id)
      .subscribe(liste => this.liste = liste);
  }
}
