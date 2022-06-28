import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserLoginDTO } from '../model/UserLoginDTO';
import { UserModel } from '../model/UserModel';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  login(userLogin: UserLoginDTO): Observable<UserLoginDTO> {
    return this.http.post<UserLoginDTO>('https://gsoback.herokuapp.com/user/auth', userLogin)
  }

  register(userRegister: UserModel): Observable<UserModel>{
    return this.http.post<UserModel>('https://gsoback.herokuapp.com/user/register', userRegister)
  }

  getAllUsers(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>('https://gsoback.herokuapp.com/user/all', this.token)
  }

  logado(){
    let ok: boolean = false

    if(environment.token != ''){
      ok = true
    }

    return ok
  }
}
