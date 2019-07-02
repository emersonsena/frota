import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {merge, Observable, of as observableOf} from 'rxjs';
import{LinhaOnibus} from '../../core/models/linhaOnibus.model';

@Injectable({
  providedIn: 'root'
})
export class LinhasOnibusService {

  basePath = 'http://www.poatransporte.com.br/php/facades/process.php';

  constructor(private httpClient: HttpClient) { }

  getLinhasOnibus(): Observable<any> {
    const href = `${this.basePath}?a=nc&p=%&t=o`;
    return this.httpClient.get<Array<LinhaOnibus>>(href);
  }

}
