import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location, DatePipe } from '@angular/common';


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

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private datePipe: DatePipe, private location: Location) {
    this.http = http;
    this.baseUrl = baseUrl
}

  ngOnInit(): void {
    this.date = this.aujourdhui;
  }

  onSubmitForm(): void {
    this.http.post<any>(this.baseUrl + 'home/posttodo/', { Titre_l: this.titre, Description: this.description, Date_echeance_l: this.date, Active_l: 1 }).subscribe();
    console.log(this.titre);
    console.log(this.date);
    this.location.back();
  }

}
