import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = []; 

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos(){

    return new Promise(  (resolve, reject) =>{

      this.http.get('https://angular-html-a7e3e.firebaseio.com/productos_idx.json')
      .subscribe((resp: Producto[]) => {
        // console.log(resp);
        this.productos = resp;
        this.cargando = false;
        resolve();
      });
    });
  }

  getProducto(id: string){
    return this.http.get(`https://angular-html-a7e3e.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto(termino: string){

    if ( this.productos.length === 0 ){
      //Cargar Productos
      this.cargarProductos().then(() => {
        // Despues de obtener los productos
        // Aplicar el filtro
        this.filtrarProductos( termino );
      });
    }else{
      // Aplicar el filtro
      this.filtrarProductos( termino );
    }
  }

  filtrarProductos(termino: string){
    console.log(this.productos);
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {

      const tituloLowerCase = prod.titulo.toLowerCase();

      if ( prod.categoria.indexOf( termino) >= 0 || tituloLowerCase.indexOf( termino) >= 0 ){
        this.productosFiltrado.push(prod);
      }
    });
  }
}
