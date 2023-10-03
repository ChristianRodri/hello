import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Cajero } from './cajero.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private apiUrl = 'http://apimapacajeros.sinaloa.gob.mx/api/collections/cajeros/records';
  

  constructor(private http: HttpClient) { }


  getCajeros(): Observable<any> {
    return this.http.get<any>(this.apiUrl);}
}
