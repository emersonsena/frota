import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {merge, Observable, of as observableOf} from 'rxjs';
import{LinhaOnibus} from '../../core/models/LinhaOnibus.model';

@Injectable({
  providedIn: 'root'
})
export class LinhasLotacaoService {

  basePath = 'http://www.poatransporte.com.br/php/facades/process.php';

  constructor(private httpClient: HttpClient) { }

  getLinhasLotacao(): Observable<any> {
    const href = `${this.basePath}?a=nc&p=%&t=l`;
    return this.httpClient.get<Array<LinhaOnibus>>(href);
  }

   getItinerario(id){
     const href = `${this.basePath}?a=il&p=${id}`;
     return this.httpClient.get<any>(href);

   }
}
