import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  name = environment.name
  id = environment.id
  constructor(private router: Router) { }

  ngOnInit(){
  }

  sair(){
    this.router.navigate(['/login'])
    environment.token = ''
    environment.name = ''
    environment.id = 0
  }
}
