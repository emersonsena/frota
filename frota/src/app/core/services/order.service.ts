import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
//import {PESCATTU_API} from '../../settings/pescattu.api';
import {Observable} from 'rxjs';
import {PurchaseOrderModel} from '../models/purchase.order.model';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) {
  }

  listBy(searchParam: { name: string, status: string, idOrdem: string }, httpParams: HttpParams): Observable<Response> {

    const name = searchParam.name === '' ? 'uninformed' : searchParam.name;
    const status = searchParam.status === 'TODOS' ? 'uninformed' : searchParam.status;
    if (!Number(searchParam.idOrdem)) {
      searchParam.idOrdem = 'uninformed';
    } else {
      searchParam.idOrdem = searchParam.idOrdem.trim().replace('.', '');
    }

    const idOrdem = searchParam.idOrdem;

    return null;
    //this.http.get<Response>(`${PESCATTU_API}/purchaseOrderWeb/orders/${name}/${status}/${idOrdem}`, {params: httpParams});
  }

  save(purchaseOrder: PurchaseOrderModel): Observable<Response> {
    return null;
  //  this.http.post<Response>(`${PESCATTU_API}/purchaseOrderWeb`, purchaseOrder);
  }

}
