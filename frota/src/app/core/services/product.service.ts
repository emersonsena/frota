import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
//import {PESCATTU_API} from '../../settings/pescattu.api';
import {ProductModel} from '../models/product.model';
import {ImageModel} from '../models/image.model';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) {

  }

  listBy(searchParam: { code: string, name: string }, httpParams: HttpParams): Observable<Response> {

    searchParam.code = searchParam.code === '' ? 'uninformed' : searchParam.code;
    searchParam.name = searchParam.name === '' ? 'uninformed' : searchParam.name;

    return null;
  //this.http.get<Response>(
  //    `${PESCATTU_API}/product/by/${searchParam.code}/${searchParam.name}`,
  //    {params: httpParams}
  //  );
  }

  save(product: ProductModel, files: Array<File>): Observable<Response> {
    if (product.productId !== null) {
      return this.editProduct(product, files);
    } else {
      return this.saveProduct(product, files);
    }
  }

  private saveProduct(product: ProductModel, files: Array<File>): Observable<Response> {
    const formData = this.getFormData(product, files);
    return null;
    //this.http.post<Response>(`${PESCATTU_API}/product/save-product-with-images`, formData);
  }

  private editProduct(product: ProductModel, files: Array<File>): Observable<Response> {
    const formData = this.getFormData(product, files);
    return null;
  //  this.http.post<Response>(`${PESCATTU_API}/product/edit`, formData);
  }

  editStatus(product: ProductModel): Observable<Response> {
    return null;
  //  this.http.put<Response>(`${PESCATTU_API}/product`, product);
  }

  getById(id: number): Observable<Response> {
    return null;
    // this.http.get<Response>(`${PESCATTU_API}/product/id/${id}`);
  }

  deleteImage(image: ImageModel): Observable<Response> {
    const httpParams = new HttpParams()
      .append('file-name', image.url)
      .append('id-image', image.imageId.toString());
    return null;
    //this.http.delete<Response>(`${PESCATTU_API}/file/product-img-delete/`, {params: httpParams});
  }

  private getFormData(product: ProductModel, files: Array<File>): FormData {
    const formData = new FormData();
    formData.append('productDto', JSON.stringify(product));
    if (files !== undefined && files !== null) {
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
      }
    }
    return formData;
  }
}
