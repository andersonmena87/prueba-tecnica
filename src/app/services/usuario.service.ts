import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioModel } from '../models/Usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  readonly usuarioUrl = environment.usuarioUrl;
  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<UsuarioModel[]>{
    return this.http.get<UsuarioModel[]>(`${this.usuarioUrl}/Usuario`);
  }

  saveUser(usuario: UsuarioModel): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(`${this.usuarioUrl}/Usuario`, usuario);
  }

  updateUser(usuario: UsuarioModel): Observable<UsuarioModel> {
    return this.http.put<UsuarioModel>(`${this.usuarioUrl}/Usuario`, usuario);
  }
}
