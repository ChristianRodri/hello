import { Icon, Map, tileLayer } from 'leaflet';
import * as $ from 'jquery';
import * as L from 'leaflet';
import { DataService } from './data.service';
import { Cajero } from './cajero.model';
import { Observable } from 'rxjs';
import { AfterViewInit, Component, OnInit, } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
    listcajero:Cajero[]=[];



    constructor(private dataservice:DataService) { }

  title = 'MyApp';
  async ngOnInit(): Promise<void> {
    const map = new Map('map').setView([24.79032, -107.38782], 9);
    var greenIcon = new Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


        await this.getCajeros();
            
        for(var cajero of this.listcajero){
            L.marker([cajero.latitud, cajero.longitud], { icon: greenIcon }).addTo(map)
            .bindPopup("<h3>"+cajero.descripcion +  '</h3>' + cajero.direccion + "<br><br><strong>La última expedición de acta fue realizado el: " + cajero.updated + "</strong>");
        }
  }
  

  
  private async getCajeros():Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
  
  
            this.dataservice.getCajeros().subscribe(
              {
                next:(response: any )=> {
                  this.listcajero = response.items; 
                  console.log(response);               
                  resolve(true);
                },error:(error: HttpErrorResponse) =>{
                    console.log(error);  
                  resolve(false);
                }
              }
            )
          });
  
    }

  
}
