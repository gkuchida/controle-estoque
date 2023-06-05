import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})

export class BodyComponent {
  currentDate:Date;
  dayOfWeek: string;
  formattedDate: string;
  conteudoVisivel: boolean = false;

  constructor(private router:Router){
    this.currentDate = new Date();
    this.dayOfWeek = this.currentDate.toLocaleString('default', {weekday:'long'});
    this.formattedDate = formatDate(this.currentDate, 'dd/MM/yyyy','en-US');
  }
  mostrar(){
    this.conteudoVisivel = true;
  }
  onButtonClick(){
    this.router.navigate(['cadastro']);
  }
}
