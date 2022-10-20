import { Component, OnInit } from '@angular/core';
import { LISTS } from '../mock_list';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {
  lists = LISTS;
  constructor() { }

  ngOnInit(): void {
  }

}
