import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ListeService } from '../liste.service';
import { Todoliste } from '../list';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  @Input() liste?: Todoliste;
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
    this.ListeService.getTodoliste(id).subscribe(liste => this.liste = liste);
  }
}
