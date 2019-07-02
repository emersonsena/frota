import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {merge, Observable, of as observableOf} from 'rxjs';
import{LinhaOnibus} from '../../core/models/linhaOnibus.model';

@Injectable({
  providedIn: 'root'
})
export class ItinerarioService {
  basePath = 'http://www.poatransporte.com.br/php/facades/process.php';

  constructor(private httpClient: HttpClient) { }

   getItinerario(id){
     const href = `${this.basePath}?a=il&p=${id}`;
     return this.httpClient.get<any>(href);

   }

   linkGoogleMaps(lat, lng){
     const href = `https://www.google.com/maps/?q=${lat},${lng}`
     return  window.open(href);
   }


}
