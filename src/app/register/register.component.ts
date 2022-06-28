import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../model/UserModel';
import { AlertsService } from '../service/alerts.service';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: UserModel = new UserModel()
  confirmarSenha: string

  constructor(
    private auth: AuthService,
    private router: Router,
    private alerts: AlertsService
    ) { }

  ngOnInit(){
    window.scroll(0,0)
  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  cadastrar(){

    if (this.user.password != this.confirmarSenha) {
      this.alerts.showAlertDanger('Password is Incorrect.')

    } else {
      this.auth.register(this.user).subscribe((resp: UserModel) => {
          this.user = resp
          this.router.navigate(['/login'])
          this.alerts.showAlertSuccess('User Registered with success!')
      })
    }
  }
}
