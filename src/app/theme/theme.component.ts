import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { TemaModel } from '../model/TemaModel';
import { AlertsService } from '../service/alerts.service';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
  theme: TemaModel = new TemaModel()
  listaThemes: TemaModel[]
  constructor(
    private router: Router,
    private themeService: ThemeService,
    private alerts: AlertsService
    ){ }

  ngOnInit(){
    window.scroll(0,0)
      if(environment.token == ''){
      this.router.navigate(['/login'])
      this.alerts.showAlertDanger('Você previsa estar logado pra ver o feed.')
    }

    this.listThemes()
  }

  listThemes(){
    this.themeService.getAllThemes().subscribe((resp: TemaModel[]) => {
      this.listaThemes = resp
    })
  }
  cadastrar(){
    this.themeService.postTheme(this.theme).subscribe((resp: TemaModel) =>{
      this.theme = resp;
      this.alerts.showAlertSuccess("Tema cadastrado")
      this.theme = new TemaModel
      this.listThemes()
    })
  }
}
