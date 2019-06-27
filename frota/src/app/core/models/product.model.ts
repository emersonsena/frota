import {ImageModel} from './image.model';

export class ProductModel {
  constructor(
    public productId: number,
    public productCod: string,
    public description: string,
    public weight: string,
    public size: string,
    public preservationFreezer: number,
    public preservationRefrigerator: number,
    public protein: string,
    public totalFat: string,
    public energeticValue: string,
    public createdAt: string,
    public quantity: number,
    public priceApp: number,
    public priceWholeSale: number,
    public name: string,
    public enabled: boolean,
    public imageDtoList: Array<ImageModel>
  ) {
  }
}
