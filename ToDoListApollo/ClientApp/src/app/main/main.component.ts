import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';

// Import de nos propres fichiers
import { ListeService } from '../liste.service';
import { Todoliste } from '../list';
import { tache } from '../tache';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent {
  @Input() todoliste?: Todoliste;
  @Input() taches?: tache[];

  liste: Todoliste | undefined;
  tache: tache[] = [];

  constructor(private route: ActivatedRoute,
              private ListeService: ListeService,
    private location: Location,
    private datePipe: DatePipe
  ) { }
}
