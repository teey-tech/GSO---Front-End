import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLoginDTO} from '../model/UserLoginDTO';
import { AlertsService } from '../service/alerts.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UserLoginDTO = new UserLoginDTO()

  constructor(
    private auth: AuthService,
    private router: Router,
    private alerts: AlertsService
    ){ }

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar(){
    this.auth.login(this.userLogin).subscribe({
      next: (resp: UserLoginDTO) => {
        this.userLogin = resp

          environment.name = this.userLogin.name
          environment.id = this.userLogin.id
          environment.token = this.userLogin.token
          this.router.navigate(['/home'])

      },
      error: erro => {
        if(erro.status == 401){
          this.alerts.showAlertDanger("User or Password is Wrong!")
        }
      }
    })
  }
}
