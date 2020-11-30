import { Injectable } from '@angular/core';
import * as data from 'src/assets/datos/platos.json';
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Plato } from 'src/entities/Plato';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  //platosFile:any = (data as any).default;
  public platosData:Plato[]=[];
  public platoEncontrado:Plato;

  constructor(public http: HttpClient) { 
    /* this.http.get('https://restcountries.eu/rest/v2/lang/es').subscribe((datosURL:any) => {
      this.datos = datosURL;
      console.log(datosURL);
    }) */
    console.log("Servicio Cargado!!!");
    // console.log(this.platosFile);
  }

  public getPlatos():any[]{
    return this.platosData;
    console.log(this.platosData);
  }

  public getPlatoXId(idx:number):any{
    for(let plato of this.platosData){
      if(plato.id == idx){
        return plato;
      }
    }
  }

  public getPlatosFromDataBase(){
    return this.http.get("http://localhost:9000/api/v1/platos/").pipe(
      map(platosData => platosData));
  }

  public getPlatoEnBaseDatosXId(idx:string){
    return this.http.get("http://localhost:9000/api/v1/platos/" + idx).pipe(
      map(platoEncontrado => platoEncontrado));
  }

  /* public buscarPlatos(termino:string):any[]{
    let platosArr:any[] = [];
    termino = termino.toLowerCase(); */

    public getPlatosBusquedaFromDataBase(termino:string){
      return this.http.get("http://localhost:9000/api/v1/platos/search?filtro=" + termino).pipe(
        map(platosSearch => platosSearch));
    }

    // ------ CRUD ------

    platoAdminUrl:string = "http://localhost:9000/api/v1/platos/";
    /* newPlato(platoNuevo: Plato){
      return this.http.post<Plato>(this.platoAdminUrl, null, {params: new HttpParams()
        .set("action","insertar").set("id", "0")
    .set("nombre", platoNuevo.nombre).set("imagenPath", platoNuevo.imagenPath)
    .set("precio", platoNuevo.precio).set("rubro", platoNuevo.rubro)}).pipe(map(nuevoPlato => {
      console.log(nuevoPlato.nombre);
      return nuevoPlato;
    }));
    } */
    newPlato(platoNuevo: Plato){
      const headers = { 'content-type': 'application/json'}
      const body = JSON.stringify(platoNuevo);

      return this.http.post<Plato>(this.platoAdminUrl, body, {'headers':headers}).pipe(map(nuevoPlato => {
        return nuevoPlato;
      }));
    }

    /* updatePlato(platoUpdate:Plato){
      return this.http.put<Plato>(this.platoAdminUrl, null, {params: new HttpParams()
        .set("action", "actualizar").set("id", (platoUpdate.id).toString())
        .set("nombre", platoUpdate.nombre).set("imagenPath", platoUpdate.imagenPath)
      .set("precio", platoUpdate.precio).set("rubro", platoUpdate.rubro)})
      .pipe(map(res =>{
        console.log(res.nombre);
        return res;
      }));
    }  */
    updatePlato(platoUpdate:Plato){
      const headers = { 'content-type': 'application/json'}
      const body = JSON.stringify(platoUpdate);

      return this.http.put<Plato>(this.platoAdminUrl+platoUpdate.id, body, {'headers':headers}).pipe(map(res => {
        console.log(res.nombre);
        return res;
      }));
    }

    deletePlato(idPlato:string){
      const uri = "http://localhost:9000/api/v1/platos/" + idPlato;
      return this.http.delete(uri).pipe(
          map(res => {
            console.log(res);
            return res;
          }));
        }
}
