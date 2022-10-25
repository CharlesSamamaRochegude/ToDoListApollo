import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-createur-liste',
  templateUrl: './createur-liste.component.html',
  styleUrls: ['./createur-liste.component.css']
})
export class CreateurListeComponent implements OnInit {
  titre?: string;
  description?: string;
  date?: string;
  http: HttpClient ;
  baseUrl: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
}

  ngOnInit(): void {
    this.date = this.aujourdhui;
  }

  onSubmitForm(): void {
    if (this.date) {
      this.date = this.date.split("-")[2] + "-" + this.date.split("-")[1] + "-" + this.date.split("-")[0];
    }
    this.http.post<any>(this.baseUrl + 'home/posttodo/', { Titre_l: this.titre, Description: this.description, dateDate_echeance_l: this.date, Active_l: 1 }).subscribe();
    console.log(this.titre);
    console.log(this.date);
    this.location.back();
  }

}
