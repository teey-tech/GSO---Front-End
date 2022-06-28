import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { environment } from 'src/environments/environment.prod';
import { UserModel} from '../model/UserModel';
import { AlertsService } from '../service/alerts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  idUsuario = environment.id
  UserList: UserModel[]
  constructor(
    private auth: AuthService,
    private router: Router,
    private alerts: AlertsService) { }

  ngOnInit(){
    window.scroll(0,0)
    if(environment.token == ''){
      this.router.navigate(['/login'])
      this.alerts.showAlertDanger('You need to be logged to see the feed.')
    }
    this.auth.refreshToken()
    this.listUsers()

  }

  listUsers(){
    this.auth.getAllUsers().subscribe((resp: UserModel[]) => {
      this.UserList = resp
    })
  }

}
