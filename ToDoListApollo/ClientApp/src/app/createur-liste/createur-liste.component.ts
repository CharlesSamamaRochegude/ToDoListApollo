import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-createur-liste',
  templateUrl: './createur-liste.component.html',
  styleUrls: ['./createur-liste.component.css']
})
export class CreateurListeComponent implements OnInit {
  titre?: string;
  description?: string;
  date?: string;

  aujourdhui: string | null = this.datePipe.transform(new Date(), 'yyyy-MM-dd');


  constructor(private datePipe: DatePipe) {
  }

  ngOnInit(): void {
  }

  onSubmitForm() {
    if (this.date) {
      this.date = this.date.split("-")[2] + "-" + this.date.split("-")[1] + "-" + this.date.split("-")[0];
    }
    console.log(this.titre);
    console.log(this.date);
  }

}
