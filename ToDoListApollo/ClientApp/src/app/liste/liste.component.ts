import { Component, OnInit } from '@angular/core';
import { List } from '../list'
import { ListeService } from '../liste.service';


@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})

export class ListeComponent implements OnInit {
  lists: List[] = [];

  getLists(): void {
    this.listeService.getListes().subscribe(lists => this.lists = lists);
  }

  constructor(private listeService: ListeService) { }

  ngOnInit(): void {
    this.getLists();
  }

}
