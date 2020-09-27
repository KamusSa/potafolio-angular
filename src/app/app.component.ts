import { Component } from '@angular/core';
import { InfoPaginaService } from './services/info-pagina.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

 /* Este constructo va a funcionar como
    una inyeccion de una dependencia    
 */
  constructor( public infoPaginaService: InfoPaginaService ){

  }
}
