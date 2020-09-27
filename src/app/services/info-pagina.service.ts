import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina  = {};
  cargada = false;

  equipo: any [] = [];

  constructor( private http: HttpClient ) {
    // console.log("Servicio de Página Cargada");
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo(){
    this.http.get('/assets/data/data-paginas.json')
    .subscribe ((resp: InfoPagina) => {
      this.cargada = true;
      this.info = resp;
      // console.log(resp);
    });
  }

  private cargarEquipo(){
    this.http.get('https://angular-html-a7e3e.firebaseio.com/equipo.json')
    .subscribe ((resp: any[]) => {
      this.equipo = resp;
      // console.log(resp);
    });
  }


}
